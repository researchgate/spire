const execa = require('execa');
const SpireError = require('spire/error');

const LINT_COMMAND = Symbol.for('lint');

function eslint(
  { setCommand, getCommand, setState, getState, hasFile, hasPackageProp },
  {
    eslintConfig: defaultEslintConfig = require.resolve(
      'spire-config-default/config/eslint'
    ),
    allowCustomConfig = true,
    eslintIgnore: defaultEslintIgnore = '.gitignore',
    allowCustomIgnore = true,
    allowCustomArgs = true,
    defaultGlob = '.',
    linterGlob = '*.js',
  }
) {
  return {
    name: 'default-plugin-eslint',
    async setup({ cli, argv }) {
      cli.command(
        'lint [glob]',
        'Lints files with ESLint',
        yargs => {
          yargs.positional('glob', {
            describe: 'Glob of files to lint',
            default: defaultGlob,
            type: 'string',
          });
        },
        () => setCommand(LINT_COMMAND)
      );
      // Resolve eslint config
      const hasCustomConfig =
        argv.includes('--config') ||
        (await hasFile('.eslintrc')) ||
        (await hasFile('.eslintrc.js')) ||
        (await hasPackageProp('eslintConfig'));
      const eslintConfig =
        allowCustomConfig && hasCustomConfig
          ? []
          : ['--config', defaultEslintConfig];
      // Resolve eslint ignore
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
      // Pass args futher
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
          { [linterGlob]: ['eslint', ...prev.eslintArgs, '--fix'] },
        ],
      }));
    },
    async run({ options, logger, cwd }) {
      if (getCommand() !== LINT_COMMAND) {
        return;
      }
      const { eslintArgs } = getState();
      const fullEslintArgs = allowCustomArgs
        ? [...eslintArgs, options.glob]
        : eslintArgs;
      logger.debug('Using eslint arguments: %s', fullEslintArgs.join(' '));
      await execa('eslint', fullEslintArgs, { cwd, stdio: 'inherit' });
    },
  };
}

module.exports = eslint;
