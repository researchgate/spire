const execa = require('execa');
const SpireError = require('spire/error');

function eslint(
  { setCommand, getCommand, setState, getState, hasFile, hasPackageProp },
  {
    command = 'lint',
    config: defaultEslintConfig = require.resolve('spire-plugin-eslint/config'),
    allowCustomConfig = true,
    eslintIgnore: defaultEslintIgnore = '.gitignore',
    allowCustomIgnore = true,
    glob = '*.js',
  }
) {
  const LINT_COMMAND = Symbol.for(command);
  return {
    name: 'spire-plugin-eslint',
    async setup({ cli, argv }) {
      cli.command(
        command,
        'lint files with ESLint',
        () => {},
        () => setCommand(LINT_COMMAND)
      );
      const hasCustomConfig =
        argv.includes('--config') ||
        (await hasFile('.eslintrc')) ||
        (await hasFile('.eslintrc.js')) ||
        (await hasPackageProp('eslintConfig'));
      const eslintConfig =
        allowCustomConfig && hasCustomConfig
          ? []
          : ['--config', defaultEslintConfig];
      const hasCustomIgnore =
        argv.includes('--ignore-path') ||
        (await hasFile('.eslintignore')) ||
        (await hasPackageProp('eslintIgnore'));
      const eslintIgnore =
        allowCustomIgnore && hasCustomIgnore
          ? []
          : (await hasFile(defaultEslintIgnore))
          ? ['--ignore-path', defaultEslintIgnore]
          : [];
      setState({
        eslintArgs: [...eslintConfig, ...eslintIgnore],
      });
      // Inform user about disallowed overrides
      if (hasCustomConfig && !allowCustomConfig) {
        throw new SpireError(
          `Custom eslint config is not allowed, using ${defaultEslintConfig} instead`
        );
      }
      if (hasCustomIgnore && !allowCustomIgnore) {
        throw new SpireError(
          `Custom eslint ignore is not allowed, using ${defaultEslintIgnore} instead`
        );
      }
    },
    async precommit() {
      setState(prev => ({
        linters: [
          ...prev.linters,
          { [glob]: ['eslint', ...prev.eslintArgs, '--fix'] },
        ],
      }));
    },
    async skip() {
      return getCommand() !== LINT_COMMAND;
    },
    async run({ options, logger, cwd }) {
      const { eslintArgs } = getState();
      const userProvidedArgs = options._.slice(1);
      const fullEslintArgs = [
        ...eslintArgs,
        ...(userProvidedArgs.length ? userProvidedArgs : ['.']),
      ];
      logger.debug('Using eslint arguments: %s', fullEslintArgs.join(' '));
      await execa('eslint', fullEslintArgs, { cwd, stdio: 'inherit' });
    },
  };
}

module.exports = eslint;
