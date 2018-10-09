function init() {
  return {
    name: 'spire-init',
    async setup({ cli }) {
      cli
        .usage('Usage: $0 [options] <cmd>')
        .option('h', { alias: 'help', group: 'Options' })
        .option('v', { alias: 'version', group: 'Options' })
        .option('debug', {
          describe: 'Output debugging information',
          type: 'boolean',
          group: 'Options',
        })
        .strict(false)
        .completion()
        .demandCommand()
        .exitProcess(false);
    },
  };
}

module.exports = init;
