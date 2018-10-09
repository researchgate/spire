const cosmiconfig = require('cosmiconfig');
const createResolver = require('./create-resolver');
const init = require('./plugins/init');
const hook = require('./plugins/hook');
const git = require('./plugins/git');
const explorer = cosmiconfig('spire');

function normilise(config) {
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
  const left = normilise(rawLeft);
  const right = normilise(rawRight);
  return {
    ...left,
    ...right,
    extends: left.extends.concat(right.extends),
    plugins: left.plugins.concat(right.plugins),
  };
}

function createFlattener(spire) {
  const resolve = createResolver(spire);
  return rootConfig => {
    const traverse = config => {
      if (config.plugins) {
        config.plugins = config.plugins.map(plugin => resolve(plugin));
      }
      if (config.extends) {
        return config.extends.reduce(
          (prev, current) => merge(prev, traverse(normilise(resolve(current)))),
          config
        );
      }
      return config;
    };
    return traverse(merge({ plugins: [init, hook, git] }, rootConfig));
  };
}

async function resolveConfig(spire) {
  const result = await explorer.search();
  const config = (result && result.config) || {};
  const flatten = createFlattener(spire);
  return flatten({
    extends: 'spire-config-default',
    ...config,
  });
}

module.exports = resolveConfig;
