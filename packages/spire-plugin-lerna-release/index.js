const execa = require('execa');

function lernaRelease(
  { setCommand, getCommand, setState, getState },
  {
    command = 'release',
    gitAuthorName = undefined,
    gitAuthorEmail = undefined,
    allowBranch = 'master',
    githubRelease = true,
    extraArgs = [],
  }
) {
  const RELEASE_COMMAND = Symbol.for(`lerna-${command}`);
  return {
    name: 'spire-plugin-lerna-release',
    async setup({ cli }) {
      cli.command(
        command,
        'run lerna publish',
        () => {},
        () => setCommand(RELEASE_COMMAND)
      );
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
    async skip() {
      return getCommand() !== RELEASE_COMMAND;
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
