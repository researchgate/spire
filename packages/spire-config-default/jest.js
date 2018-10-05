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
    defaultTestRegex = '',
    linterGlob = '*.js',
  }
) {
  return {
    name: 'spire-config-default/jest',
    async setup({ cli }) {
      cli.command(
        'test [regex]',
        'Runs tests with Jest',
        yargs => {
          yargs.positional('regex', {
            describe: 'Regex of test files to run',
            default: defaultTestRegex,
            type: 'string',
          });
        },
        () => setCommand(TEST_COMMAND)
      );
      // Resolve jest config
      const hasCustomConfig =
        hasFile('jest.config.js') ||
        hasFile('jest.config.json') ||
        hasPackageProp('jest');
      const jestConfig =
        allowCustomConfig && hasCustomConfig
          ? []
          : ['--config', defaultJestConfig];
      // Pass jest args futher
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
      const fullJestArgs = [...jestArgs, options.regex];
      logger.debug('Using jest arguments: %s', fullJestArgs.join(' '));
      await execa('jest', fullJestArgs, { cwd, stdio: 'inherit' });
    },
  };
}

module.exports = jest;
