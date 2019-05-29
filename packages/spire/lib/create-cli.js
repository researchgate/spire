const yargs = require('yargs');

/**
 * @returns {import('yargs').Argv}
 */
function createCli() {
  return yargs
    .parserConfiguration({
      'halt-at-non-option': true,
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
    .exitProcess(false)
    .strict(true);
}

module.exports = createCli;
