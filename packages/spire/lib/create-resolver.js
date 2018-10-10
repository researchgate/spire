const invariant = require('invariant');

function createResolver(context, core) {
  return entry => {
    const normilised = Array.isArray(entry) ? entry : [entry];
    const [entryPathOrFn, options = {}] = normilised;
    const createEntry =
      typeof entryPathOrFn === 'string'
        ? require(entryPathOrFn.replace(/<rootDir>/g, context.cwd))
        : entryPathOrFn;
    invariant(
      typeof createEntry === 'function',
      'Config or plugin should export a function'
    );
    return createEntry(core, options);
  };
}

module.exports = createResolver;
