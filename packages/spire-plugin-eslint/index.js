const execa = require('execa');
const SpireError = require('spire/error');

function eslint(
  { setState, getState, hasFile, hasPackageProp },
  {
    command = 'lint',
    config: defaultEslintConfig = require.resolve('spire-plugin-eslint/config'),
    allowCustomConfig = true,
    eslintIgnore: defaultEslintIgnore = '.gitignore',
    allowCustomIgnore = true,
    glob = '*.js',
  }
) {
  return {
    name: 'spire-plugin-eslint',
    command,
    description: 'lint files with ESLint',
    async setup({ cli, argv }) {
      const hasCustomConfig =
        argv.includes('--config') ||
        (await hasFile('.eslintrc')) ||
        (await hasFile('.eslintrc.js')) ||
        (await hasFile('.eslintrc.json')) ||
        (await hasFile('.eslintrc.yaml')) ||
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
      setState((prev) => ({
        linters: [
          ...prev.linters,
          { [glob]: ['eslint', ...prev.eslintArgs, '--fix'] },
        ],
      }));
    },
    async run({ options, logger, cwd }) {
      const { eslintArgs } = getState();
      const [, ...userProvidedArgs] = options._;
      const finalEslintArgs = [
        ...eslintArgs,
        ...(userProvidedArgs.length ? userProvidedArgs : ['.']),
      ];
      logger.debug('Using eslint arguments: %s', finalEslintArgs.join(' '));
      await execa('eslint', finalEslintArgs, {
        cwd,
        stdio: 'inherit',
        preferLocal: true,
      });
    },
  };
}

module.exports = eslint;
