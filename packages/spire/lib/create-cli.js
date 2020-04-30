const yargs = require('yargs');

/**
 * @returns {import('yargs').Argv}
 */
function createCli() {
  return yargs
    .parserConfiguration({
      'halt-at-non-option': true,
      'unknown-options-as-args': true,
      'strip-dashed': true,
      'strip-aliased': true,
    })
    .usage('Usage: $0 [options] <cmd>')
    .option('help', { alias: 'h', group: 'Options' })
    .option('version', { alias: 'v', group: 'Options' })
    .option('debug', {
      describe: 'Output debugging information',
      type: 'boolean',
      default: false,
      group: 'Options',
    })
    .command(
      '*',
      '',
      () => {},
      (argv) => {
        yargs.showHelp();
        console.error('\nUnknown command: ' + argv._[0]);
        process.exit(1);
      }
    )
    .demandCommand(1, 'You need to specify at least one command')
    .exitProcess(false);
}

module.exports = createCli;
