const execa = require('execa');

function lernaRelease(
  { setState, getState },
  {
    command = 'release',
    gitAuthorName = undefined,
    gitAuthorEmail = undefined,
    allowBranch = 'master',
    createRelease = false,
    extraArgs = [],
  }
) {
  return {
    name: 'spire-plugin-lerna-release',
    command,
    description: 'run lerna publish',
    async setup() {
      const publishArgs = [
        '--conventional-commits',
        '--allow-branch',
        allowBranch,
      ];

      if (createRelease !== false) {
        publishArgs.push('--create-release', createRelease);
      }

      setState({
        lernaPublishArgs: publishArgs.concat(extraArgs),
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
        preferLocal: true,
      });
    },
  };
}

module.exports = lernaRelease;
