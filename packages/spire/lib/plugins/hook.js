const prettyFormat = require('pretty-format');

function hook({ getState }) {
  let hookToExecute;
  return {
    name: 'spire-hook-support',
    async setup({ cli }) {
      cli.command(
        'hook <name>',
        false,
        yargs => {
          yargs.positional('name', {
            describe: 'Hook name',
            choices: [
              'preinstall',
              'postinstall',
              'preuninstall',
              'precommit',
              'postmerge',
            ],
            type: 'string',
          });
        },
        argv => {
          hookToExecute = argv.name;
        }
      );
    },
    async teardown(context) {
      switch (hookToExecute) {
        case 'preinstall':
        case 'postinstall':
        case 'preuninstall':
        case 'precommit':
        case 'postmerge': {
          for (const plugin of context.config.plugins) {
            if (plugin[hookToExecute]) {
              context.logger.debug(`Running ${plugin.name}.${hookToExecute}`);
              await plugin[hookToExecute](context);
            }
          }
        }
      }
      context.logger.debug(
        'Using linters:\n%s',
        prettyFormat(getState().linters)
      );
    },
  };
}

module.exports = hook;
