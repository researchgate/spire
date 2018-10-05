const invariant = require('invariant');

function createResolver(spire) {
  return entry => {
    const normilised = Array.isArray(entry) ? entry : [entry];
    const [entryPathOrFn, options = {}] = normilised;
    const createEntry =
      typeof entryPathOrFn === 'string'
        ? require(entryPathOrFn)
        : entryPathOrFn;
    invariant(
      typeof createEntry === 'function',
      'Config or plugin should export a function'
    );
    return createEntry(spire, options);
  };
}

module.exports = createResolver;
