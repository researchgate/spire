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
        'Runs semantic-release',
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
    async run({ cwd, logger }) {
      if (getCommand() !== RELEASE_COMMAND) {
        return;
      }
      const { semanticReleaseArgs } = getState();
      logger.debug(
        'Using semantic-release arguments: %s',
        semanticReleaseArgs.join(' ')
      );
      const env = {
        SPIRE_CHANGELOG_NAME: changelogName,
        GIT_AUTHOR_NAME: gitAuthorName,
        GIT_AUTHOR_EMAIL: gitAuthorEmail,
        GIT_COMMITTER_NAME: gitAuthorName,
        GIT_COMMITTER_EMAIL: gitAuthorEmail,
      };
      await execa('semantic-release', semanticReleaseArgs, {
        env,
        cwd,
        stdio: 'inherit',
      });
    },
  };
}

module.exports = semanticRelease;
