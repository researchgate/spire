const execa = require('execa');
const SpireError = require('spire/error');

const FORMAT_COMMAND = Symbol.for('format');

function prettier(
  { hasFile, hasPackageProp, setCommand, getCommand, setState, getState },
  {
    prettierConfig: defaultPrettierConfig = require.resolve(
      'spire-config-default/config/prettier'
    ),
    allowCustomConfig = true,
    prettierIgnore: defaultPrettierIgnore = '.gitignore',
    allowCustomIgnore = true,
    defaultGlob = '**/*.js',
    linterGlobs = ['*.js', '*.json', '*.md'],
  }
) {
  return {
    name: 'spire-config-default/prettier',
    async setup({ argv, cli }) {
      cli.command(
        'format',
        'format files with Prettier',
        () => {},
        () => setCommand(FORMAT_COMMAND)
      );
      const hasCustomConfig =
        (await hasFile('.prettierrc')) ||
        (await hasFile('.prettierrc.js')) ||
        (await hasFile('.prettierrc.json')) ||
        (await hasFile('.prettierrc.yaml')) ||
        (await hasFile('.prettierrc.yml')) ||
        (await hasFile('.prettierrc.toml')) ||
        (await hasFile('prettier.config.js')) ||
        (await hasPackageProp('prettier'));
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
          ...linterGlobs.map(glob => ({
            [glob]: ['prettier', ...prev.prettierArgs],
          })),
        ],
      }));
    },
    async skip() {
      return getCommand() !== FORMAT_COMMAND;
    },
    async run({ options, logger, cwd }) {
      const { prettierArgs } = getState();
      const userProvidedArgs = options._.slice(1);
      const finalPrettierArgs = [
        ...prettierArgs,
        ...(userProvidedArgs.length ? userProvidedArgs : [defaultGlob]),
      ];
      logger.debug('Using prettier arguments: %s', finalPrettierArgs.join(' '));
      await execa('prettier', finalPrettierArgs, { cwd, stdio: 'inherit' });
    },
  };
}

module.exports = prettier;
