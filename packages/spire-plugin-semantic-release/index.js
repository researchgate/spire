const execa = require('execa');
const SpireError = require('spire/error');

function semanticRelease(
  { setCommand, getCommand, setState, getState, hasFile, hasPackageProp },
  {
    command = 'release',
    config: defaultSemanticReleaseConfig = require.resolve(
      'spire-plugin-semantic-release/config'
    ),
    allowCustomConfig = true,
    changelogName = 'CHANGELOG.md',
    gitAuthorName = undefined,
    gitAuthorEmail = undefined,
  }
) {
  const RELEASE_COMMAND = Symbol.for(command);
  return {
    name: 'spire-plugin-semantic-release',
    async setup({ cli }) {
      cli.command(
        command,
        'run semantic-release',
        () => {},
        () => setCommand(RELEASE_COMMAND)
      );
      const hasCustomConfig =
        (await hasFile('release.config.js')) ||
        (await hasFile('.releaserc')) ||
        (await hasPackageProp('release'));
      const semanticReleaseConfig =
        allowCustomConfig && hasCustomConfig
          ? []
          : ['--extends', defaultSemanticReleaseConfig];
      setState({
        semanticReleaseArgs: [...semanticReleaseConfig],
      });
      // Inform user about disallowed overrides
      if (hasCustomConfig && !allowCustomConfig) {
        throw new SpireError(
          `Custom semantic-release config is not allowed, using ${defaultSemanticReleaseConfig} instead`
        );
      }
    },
    async skip() {
      return getCommand() !== RELEASE_COMMAND;
    },
    async run({ options, cwd, logger }) {
      const { semanticReleaseArgs } = getState();
      const [, ...userProvidedArgs] = options._;
      const finalSemanticReleaseArgs = [
        ...semanticReleaseArgs,
        ...userProvidedArgs,
      ];
      logger.debug(
        'Using semantic-release arguments: %s',
        finalSemanticReleaseArgs.join(' ')
      );
      const env = {
        SPIRE_CHANGELOG_NAME: changelogName,
        GIT_AUTHOR_NAME: gitAuthorName,
        GIT_AUTHOR_EMAIL: gitAuthorEmail,
        GIT_COMMITTER_NAME: gitAuthorName,
        GIT_COMMITTER_EMAIL: gitAuthorEmail,
      };
      await execa('semantic-release', finalSemanticReleaseArgs, {
        env,
        cwd,
        stdio: 'inherit',
      });
    },
  };
}

module.exports = semanticRelease;
