const prettyFormat = require('pretty-format');

function hook({ setCommand, getCommand, getState }) {
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
        argv => setCommand(Symbol.for(argv.name))
      );
    },
    async teardown(context) {
      const command = getCommand();
      switch (command) {
        case Symbol.for('preinstall'):
        case Symbol.for('postinstall'):
        case Symbol.for('preuninstall'):
        case Symbol.for('precommit'):
        case Symbol.for('postmerge'): {
          const hook = Symbol.keyFor(command);
          for (const plugin of context.config.plugins) {
            if (plugin[hook]) {
              context.logger.debug(`Running ${plugin.name}.${hook}`);
              await plugin[hook](context);
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
