const execa = require('execa');
const SpireError = require('spire/error');

function semanticRelease(
  { setState, getState, hasFile, hasPackageProp, getProvider },
  {
    command = 'release',
    provider = 'auto',
    config: defaultSemanticReleaseConfig,
    allowCustomConfig = true,
    changelogName = 'CHANGELOG.md',
    gitAuthorName = undefined,
    gitAuthorEmail = undefined,
  }
) {
  const hasCustomConfig = async () =>
    (await hasFile('release.config.js')) ||
    (await hasFile('.releaserc')) ||
    (await hasPackageProp('release'));

  return {
    name: 'spire-plugin-semantic-release',
    command,
    description: 'run semantic-release',
    async setup({ resolve }) {
      let semanticReleaseArgs = [];
      let semanticReleaseConfigFile = defaultSemanticReleaseConfig;
      const customConfig = hasCustomConfig();

      if (!customConfig || !allowCustomConfig) {
        if (!semanticReleaseConfigFile) {
          let actualProvider = provider;
          if (actualProvider === 'auto') {
            actualProvider = getProvider();
          }
          semanticReleaseConfigFile = `spire-plugin-semantic-release/config/${
            actualProvider === 'none' ? 'default' : actualProvider
          }`;
        }

        semanticReleaseArgs = ['--extends', resolve(semanticReleaseConfigFile)];
      }

      setState({
        semanticReleaseArgs,
      });

      // Inform user about disallowed overrides
      if (customConfig && !allowCustomConfig) {
        throw new SpireError(
          `Custom semantic-release config is not allowed, using ${defaultSemanticReleaseConfig} instead`
        );
      }
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
        preferLocal: true,
      });
    },
  };
}

module.exports = semanticRelease;
