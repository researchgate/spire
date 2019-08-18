const execa = require('execa');
const SpireError = require('spire/error');

function prettier(
  {
    hasFile,
    hasPackageProp,
    getPackageProp,
    setPackageProp,
    setState,
    getState,
  },
  {
    command = 'format',
    config: defaultPrettierConfig = 'spire-plugin-prettier/config',
    autosetPrettierConfig = true,
    allowCustomConfig = true,
    prettierIgnore: defaultPrettierIgnore = '.gitignore',
    allowCustomIgnore = true,
    glob = '**/*.+(js|json|less|css|ts|tsx|md)',
  }
) {
  async function hasCustomPrettierConfig() {
    return (
      (await hasFile('.prettierrc')) ||
      (await hasFile('.prettierrc.js')) ||
      (await hasFile('.prettierrc.json')) ||
      (await hasFile('.prettierrc.yaml')) ||
      (await hasFile('.prettierrc.yml')) ||
      (await hasFile('.prettierrc.toml')) ||
      (await hasFile('prettier.config.js')) ||
      (await hasPackageProp('prettier'))
    );
  }
  return {
    name: 'spire-plugin-prettier',
    command,
    description: 'format files with Prettier',
    async postinstall({ logger }) {
      if (autosetPrettierConfig) {
        const hasCustomConfig = await hasCustomPrettierConfig();
        if (hasCustomConfig) {
          const currentPrettierPkgProp = await getPackageProp('prettier');
          if (currentPrettierPkgProp !== defaultPrettierConfig) {
            return logger.warn(
              'Attempted to set Prettier config but it already exists. Please ensure existing config re-exports `%s`.',
              defaultPrettierConfig
            );
          }
        }
        await setPackageProp('prettier', defaultPrettierConfig);
        await execa('prettier', ['--write', 'package.json']);
      }
    },
    async setup({ argv }) {
      const hasCustomConfig = await hasCustomPrettierConfig();
      const prettierConfig =
        allowCustomConfig && hasCustomConfig
          ? []
          : ['--config', defaultPrettierConfig];
      const hasCustomIgnore =
        argv.includes('--ignore-path') || (await hasFile('.prettierignore'));
      const prettierIgnore =
        hasCustomIgnore && allowCustomIgnore
          ? []
          : ['--ignore-path', defaultPrettierIgnore];
      setState({
        prettierArgs: [...prettierConfig, ...prettierIgnore, '--write'],
      });
      // Inform user about disallowed overrides
      if (hasCustomConfig && !allowCustomConfig) {
        throw new SpireError(
          `Custom prettier config is not allowed, using ${defaultPrettierConfig} instead`
        );
      }
      if (hasCustomIgnore && !allowCustomIgnore) {
        throw new SpireError(
          `Custom .prettierignore is not allowed, using ${defaultPrettierIgnore} instead`
        );
      }
    },
    async precommit() {
      setState(prev => ({
        linters: [
          ...prev.linters,
          { [glob]: ['prettier', ...prev.prettierArgs] },
        ],
      }));
    },
    async run({ options, logger, cwd }) {
      const { prettierArgs } = getState();
      const [, ...userProvidedArgs] = options._;
      const finalPrettierArgs = [
        ...prettierArgs,
        ...(userProvidedArgs.length ? userProvidedArgs : [glob]),
      ];
      logger.debug('Using prettier arguments: %s', finalPrettierArgs.join(' '));
      await execa('prettier', finalPrettierArgs, { cwd, stdio: 'inherit' });
    },
  };
}

module.exports = prettier;
