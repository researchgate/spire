const execa = require('execa');
const SpireError = require('spire/error');
const { writeFile, readFile } = require('fs-extra');
const { join } = require('path');

function eslint(
  { setState, getState, hasFile, hasPackageProp },
  {
    command = 'lint',
    config: defaultEslintConfig = 'spire-plugin-eslint/config',
    autosetEslintConfig = true,
    allowCustomConfig = true,
    eslintIgnore: defaultEslintIgnore = '.gitignore',
    allowCustomIgnore = true,
    glob = '*.js',
  }
) {
  async function hasCustomEslintConfig() {
    return (
      (await hasFile('.eslintrc')) ||
      (await hasFile('.eslintrc.js')) ||
      (await hasFile('.eslintrc.json')) ||
      (await hasFile('.eslintrc.yaml')) ||
      (await hasFile('.eslintrc.yml')) ||
      (await hasPackageProp('eslintConfig'))
    );
  }
  return {
    name: 'spire-plugin-eslint',
    command,
    description: 'lint files with ESLint',
    async postinstall({ cwd, logger }) {
      if (autosetEslintConfig) {
        const hasCustomConfig = await hasCustomEslintConfig();
        const configFile = join(cwd, '.eslintrc.js');
        if (hasCustomConfig) {
          if (await hasFile('.eslintrc.js')) {
            const currentContent = await readFile(configFile, 'UTF-8');
            if (!currentContent.includes(defaultEslintConfig)) {
              return logger.warn(
                'Attempted to set ESLint config but it already exists. ' +
                  'Please ensure existing config re-exports `%s`.',
                defaultEslintConfig
              );
            }
          }
        }
        await writeFile(
          configFile,
          '// This file was created by spire-plugin-eslint for editor support\n' +
            `module.exports = require('${defaultEslintConfig}');`
        );
      }
    },
    async setup({ cli, argv, cwd }) {
      const hasCustomConfig =
        argv.includes('--config') || (await hasCustomEslintConfig());
      const eslintConfig =
        allowCustomConfig && hasCustomConfig
          ? []
          : [
              '--config',
              require.resolve(defaultEslintConfig, { paths: [__dirname, cwd] }),
            ];
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
