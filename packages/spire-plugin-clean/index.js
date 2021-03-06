const execa = require('execa');

function clean(
  { setState, getState },
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
  return {
    name: 'spire-plugin-clean',
    command: command,
    description: 'cleanup using git-clean',
    async setup() {
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
