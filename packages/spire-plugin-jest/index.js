const execa = require('execa');
const SpireError = require('spire/error');

function jest(
  { setCommand, getCommand, setState, getState, hasFile, hasPackageProp },
  {
    command = 'test',
    config: defaultJestConfig = require.resolve(
      'spire-plugin-jest/jest-preset'
    ),
    allowCustomConfig = true,
    glob = '*.js',
  }
) {
  const TEST_COMMAND = Symbol.for(command);
  return {
    name: 'spire-plugin-jest',
    async setup({ cli }) {
      cli.command(
        command,
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
            [glob]: ['jest', ...state.jestArgs, '--bail', '--findRelatedTests'],
          },
        ],
      }));
    },
    async skip() {
      return getCommand() !== TEST_COMMAND;
    },
    async run({ options, logger, cwd }) {
      const { jestArgs } = getState();
      const [, ...userProvidedArgs] = options._;
      const finalJestArgs = [...jestArgs, ...userProvidedArgs];
      logger.debug('Using jest arguments: %s', finalJestArgs.join(' '));
      const env = { SPIRE_ROOT_DIR: cwd };
      await execa('jest', finalJestArgs, { cwd, env, stdio: 'inherit' });
    },
  };
}

module.exports = jest;
