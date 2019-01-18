const cosmiconfig = require('cosmiconfig');
const createResolver = require('./create-resolver');
const init = require('./plugins/init');
const hook = require('./plugins/hook');
const git = require('./plugins/git');
const explorer = cosmiconfig('spire');

function normalise(config) {
  return {
    ...config,
    extends: config.extends
      ? Array.isArray(config.extends)
        ? config.extends
        : [config.extends]
      : [],
    plugins: config.plugins || [],
  };
}

function merge(rawLeft, rawRight) {
  const left = normalise(rawLeft);
  const right = normalise(rawRight);
  return {
    ...left,
    ...right,
    extends: left.extends.concat(right.extends),
    plugins: left.plugins.concat(right.plugins),
  };
}

function createFlattener(context, core) {
  const resolve = createResolver(context, core);
  return rootConfig => {
    const traverse = config => {
      if (config.plugins) {
        config.plugins = config.plugins.map(plugin => resolve(plugin));
      }
      if (config.extends) {
        return config.extends.reduce(
          (prev, current) => merge(prev, traverse(normalise(resolve(current)))),
          config
        );
      }
      return config;
    };
    const essentials = { plugins: [init, hook, git] };
    return traverse(merge(essentials, rootConfig));
  };
}

async function resolveConfig(context, core) {
  const result = await explorer.search();
  const flatten = createFlattener(context, core);
  if (result) {
    context.logger.debug('Found config at %s', result.filepath);
    return flatten(result.config);
  }
  context.logger.debug('Using default config');
  return flatten({ extends: 'spire-config-default' });
}

module.exports = resolveConfig;
