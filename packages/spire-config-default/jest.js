const execa = require('execa');
const SpireError = require('spire/error');

const TEST_COMMAND = Symbol.for('test');

function jest(
  { setCommand, getCommand, setState, getState, hasFile, hasPackageProp },
  {
    jestConfig: defaultJestConfig = require.resolve(
      'spire-config-default/config/jest'
    ),
    allowCustomConfig = true,
    linterGlob = '*.js',
  }
) {
  return {
    name: 'spire-config-default/jest',
    async setup({ cli }) {
      cli.command(
        'test',
        'run tests with Jest',
        () => {},
        () => setCommand(TEST_COMMAND)
      );
      const hasCustomConfig =
        (await hasFile('jest.config.js')) ||
        (await hasFile('jest.config.json')) ||
        (await hasPackageProp('jest'));
      const jestConfig =
        allowCustomConfig && hasCustomConfig
          ? []
          : ['--config', defaultJestConfig];
      setState({
        jestArgs: [...jestConfig, '--passWithNoTests'],
      });
      // Inform user about disallowed overrides
      if (hasCustomConfig && !allowCustomConfig) {
        throw new SpireError(
          `Custom jest config is not allowed, using ${defaultJestConfig} instead`
        );
      }
    },
    async precommit() {
      setState(state => ({
        linters: [
          ...state.linters,
          {
            [linterGlob]: [
              'jest',
              ...state.jestArgs,
              '--bail',
              '--findRelatedTests',
            ],
          },
        ],
      }));
    },
    async run({ options, logger, cwd }) {
      if (getCommand() !== TEST_COMMAND) {
        return;
      }
      const { jestArgs } = getState();
      const userProvidedArgs = options._.slice(1);
      const fullJestArgs = [...jestArgs, ...userProvidedArgs];
      logger.debug('Using jest arguments: %s', fullJestArgs.join(' '));
      const env = { SPIRE_ROOT_DIR: cwd };
      await execa('jest', fullJestArgs, { cwd, env, stdio: 'inherit' });
    },
  };
}

module.exports = jest;
