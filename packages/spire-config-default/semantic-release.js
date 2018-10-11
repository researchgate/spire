const execa = require('execa');
const SpireError = require('spire/error');

const RELEASE_COMMAND = Symbol.for('release');

function semanticRelease(
  { setCommand, getCommand, setState, getState, hasFile, hasPackageProp },
  {
    semanticReleaseConfig: defaultSemanticReleaseConfig = require.resolve(
      'spire-config-default/config/semantic-release'
    ),
    allowCustomConfig = true,
    changelogName = 'changelog.md',
    gitAuthorName = undefined,
    gitAuthorEmail = undefined,
  }
) {
  return {
    name: 'spire-config-default/semantic-release',
    async setup({ cli }) {
      cli.command(
        'release',
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
          : ['--config', defaultSemanticReleaseConfig];
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
      const userProvidedArgs = options._.slice(1);
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
