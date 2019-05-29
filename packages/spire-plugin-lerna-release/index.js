const execa = require('execa');

function lernaRelease(
  { setState, getState },
  {
    command = 'release',
    gitAuthorName = undefined,
    gitAuthorEmail = undefined,
    allowBranch = 'master',
    githubRelease = true,
    extraArgs = [],
  }
) {
  return {
    name: 'spire-plugin-lerna-release',
    command,
    description: 'run lerna publish',
    async setup() {
      setState({
        lernaPublishArgs: [
          '--conventional-commits',
          '--allow-branch',
          allowBranch,
          '--github-release',
          githubRelease,
          '--yes',
          ...extraArgs,
        ],
      });
    },
    async run({ options, cwd, logger }) {
      const { lernaPublishArgs } = getState();
      const [, ...userProvidedArgs] = options._;
      const finalLernaPublishArgs = [...lernaPublishArgs, ...userProvidedArgs];
      logger.debug(
        'Using lerna publish arguments: %s',
        finalLernaPublishArgs.join(' ')
      );
      const env = {
        GIT_AUTHOR_NAME: gitAuthorName,
        GIT_AUTHOR_EMAIL: gitAuthorEmail,
        GIT_COMMITTER_NAME: gitAuthorName,
        GIT_COMMITTER_EMAIL: gitAuthorEmail,
      };
      await execa('lerna', ['publish', ...finalLernaPublishArgs], {
        env,
        cwd,
        stdio: 'inherit',
      });
    },
  };
}

module.exports = lernaRelease;
