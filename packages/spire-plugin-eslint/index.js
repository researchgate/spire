const execa = require('execa');
const SpireError = require('spire/error');

const SUPPORTED_CONFIG_FILES = [
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.json',
  '.eslintrc.yaml',
  '.eslintrc.yml',
];

function eslint(
  { setState, getState, hasFile, readFile, writeFile, hasPackageProp },
  {
    command = 'lint',
    config: defaultEslintConfig = 'spire-plugin-eslint/config',
    autosetEslintConfig = true,
    allowCustomConfig = true,
    eslintIgnore: defaultEslintIgnore = '.gitignore',
    allowCustomIgnore = true,
    fileExtensions = ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
    /* @deprecated */
    glob,
  }
) {
  async function hasCustomEslintConfig() {
    for (const file of SUPPORTED_CONFIG_FILES) {
      if (await hasFile(file)) {
        return file;
      }
    }

    return hasPackageProp('eslintConfig');
  }
  return {
    name: 'spire-plugin-eslint',
    command,
    description: 'lint files with ESLint',
    async postinstall({ logger }) {
      if (autosetEslintConfig) {
        const hasCustomConfig = await hasCustomEslintConfig();
        if (hasCustomConfig && typeof hasCustomConfig === 'string') {
          const currentContent = await readFile(hasCustomConfig, 'UTF-8');
          if (!currentContent.includes(defaultEslintConfig)) {
            return logger.warn(
              'Attempted to set ESLint config but it already exists. ' +
                'Please ensure existing config re-exports `%s`.',
              defaultEslintConfig
            );
          }
        }
        await writeFile(
          '.eslintrc.js',
          '// This file was created by spire-plugin-eslint for editor support\n' +
            `module.exports = require('${defaultEslintConfig}');`
        );
      }
    },
    async setup({ argv, resolve }) {
      const hasCustomConfig =
        argv.includes('--config') || (await hasCustomEslintConfig());
      const eslintConfig =
        allowCustomConfig && hasCustomConfig
          ? []
          : ['--config', resolve(defaultEslintConfig)];
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
      const eslintExtensions = ['--ext', fileExtensions.join(',')];
      setState({
        eslintArgs: [...eslintConfig, ...eslintIgnore, ...eslintExtensions],
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
      if (glob) {
        console.warn(
          'spire-plugin-eslint: The glob option is deprecated. Use the option `fileExtensions` instead.'
        );
      }
      setState((prev) => ({
        linters: [
          ...prev.linters,
          {
            [glob ||
            `*.(${fileExtensions.map((ext) => ext.substr(1)).join('|')})`]: [
              'eslint',
              ...prev.eslintArgs,
              '--fix',
            ],
          },
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
