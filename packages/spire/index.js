const yargs = require('yargs');
const prettyFormat = require('pretty-format');
const resolveConfig = require('./lib/resolve-config');
const createLogger = require('./lib/create-logger');
const createState = require('./lib/create-state');
const createCore = require('./lib/create-core');
const validatePlugin = require('./lib/validate-plugin');

async function spire({
  argv = process.argv.slice(2),
  cwd = process.cwd(),
  env = process.env,
  stdout = process.stdout,
  stderr = process.stderr,
} = {}) {
  const startedAt = Date.now();
  const errors = [];
  const cli = yargs;
  const logger = createLogger({ stdout, stderr, argv });
  const context = { argv, cli, cwd, env, logger };
  const state = createState();
  const core = createCore(context, state);
  const config = await resolveConfig(context, core);
  context.config = config;
  logger.debug('Using resolved config:\n%s', prettyFormat(config));
  // Run setup hooks
  for (const plugin of config.plugins) {
    if (plugin.setup) {
      try {
        logger.debug('Running %s.setup', plugin.name);
        await validatePlugin(plugin.setup);
        await plugin.setup(context);
      } catch (error) {
        errors.push(error);
      }
    }
  }
  const setupHasFailed = errors.length > 0;
  if (!setupHasFailed) {
    // Parse cli options
    try {
      const { help, version, ...options } = cli.parse(argv);
      context.options = options;
      // Exit if help or version needs to be printed
      if (Boolean(help) || Boolean(version)) {
        return 0;
      }
    } catch (error) {
      // Intentionally do not report YError "Unknown argument" errors
      return 1;
    }
    // Run main hooks
    for (const plugin of config.plugins) {
      if (plugin.skip) {
        try {
          await validatePlugin(plugin.skip);
          // Skip plugin if needed
          if (await plugin.skip(context)) {
            logger.debug('Skipping %s.run', plugin.name);
            continue;
          }
        } catch (error) {
          errors.push(error);
        }
      }
      if (plugin.run) {
        try {
          logger.debug('Running %s.run', plugin.name);
          await validatePlugin(plugin.run);
          await plugin.run(context);
          // Exit if plugin has stopped the execution
          if (state.getState().stopped) {
            break;
          }
        } catch (error) {
          errors.push(error);
        }
      }
    }
  }
  // Run teardown hooks
  for (const plugin of config.plugins) {
    if (plugin.teardown) {
      try {
        logger.debug('Running %s.teardown', plugin.name);
        await validatePlugin(plugin.teardown);
        await plugin.teardown(context);
      } catch (error) {
        errors.push(error);
      }
    }
  }
  // Flush error messages (if any)
  if (errors.length) {
    for (const error of errors) {
      logger.fatal(error);
    }
    return 1;
  } else {
    logger.success('Done in %ds', (Date.now() - startedAt) / 1000);
    return 0;
  }
}

module.exports = spire;
