const execa = require('execa');

function clean(
  { setState, getState, setCommand, getCommand },
  {
    command = 'clean',
    keep = [
      'node_modules/',
      '.vscode/',
      '.atom/',
      '.idea/',
      '.sublime-project/',
    ],
  }
) {
  const CLEAN_COMMAND = Symbol.for(command);
  return {
    name: 'spire-plugin-clean',
    async setup({ cli }) {
      cli.command(
        command,
        'remove files with git clean',
        () => {},
        () => setCommand(CLEAN_COMMAND)
      );
      setState({
        gitCleanArgs: [
          '-X',
          '-d',
          '--force',
          ...keep.reduce(
            (output, pattern) => [...output, '--exclude', `!${pattern}`],
            []
          ),
        ],
      });
    },
    async skip() {
      return getCommand() !== CLEAN_COMMAND;
    },
    async run({ options, logger, cwd }) {
      const { gitCleanArgs } = getState();
      const [, ...userProvidedArgs] = options._;
      const finalGitCleanArgs = [...gitCleanArgs, ...userProvidedArgs];
      logger.debug(
        'Using git clean arguments: %s',
        finalGitCleanArgs.join(' ')
      );
      await execa('git', ['clean', ...finalGitCleanArgs], {
        cwd,
        stdio: 'inherit',
      });
    },
  };
}

module.exports = clean;
