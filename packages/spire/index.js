const prettyFormat = require('pretty-format');
const resolveConfig = require('./lib/resolve-config');
const createCli = require('./lib/create-cli');
const createLogger = require('./lib/create-logger');
const createState = require('./lib/create-state');
const createCore = require('./lib/create-core');
const validatePlugin = require('./lib/validate-plugin');
const noop = () => {};

async function spire({
  argv = process.argv.slice(2),
  cwd = process.cwd(),
  env = process.env,
  stdout = process.stdout,
  stderr = process.stderr,
} = {}) {
  const startedAt = Date.now();
  const errors = [];
  const logger = createLogger({ stdout, stderr, argv });
  const cli = createCli();
  const context = { argv, cli, cwd, env, logger };
  const state = createState();
  const core = createCore(context, state);
  const running = [];
  // Resolve and flattern config
  let config;
  try {
    config = await resolveConfig(context, core);
    context.config = config;
    logger.debug('Using resolved config:\n%s', prettyFormat(config));
  } catch (reason) {
    logger.fatal('Failed to load config: %s', reason.message);
    return 1;
  }
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
  // Register plugin commands
  for (const plugin of config.plugins) {
    if (plugin.command) {
      await validatePlugin(plugin.run);
      cli.command(plugin.command, plugin.description, noop, async options => {
        // Call the plugin command
        try {
          logger.debug('Running %s.run', plugin.name);
          const promise = plugin.run({ options, ...context });
          running.push(promise);
          await promise;
        } catch (error) {
          errors.push(error);
        }
      });
    }
  }
  const setupHasFailed = errors.length > 0;
  if (!setupHasFailed) {
    // Parse cli
    try {
      const { help, version } = cli.parse(argv);
      // Exit if help or version needs to be printed
      if (Boolean(help) || Boolean(version)) {
        return 0;
      }
    } catch (error) {
      // Intentionally do not report YError "Unknown argument" errors
      return 1;
    }
  }
  // Wait for commands to finish
  await Promise.all(running);
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
  }
  logger.success('Done in %ds', (Date.now() - startedAt) / 1000);
  return 0;
}

module.exports = spire;
