const requireFrom = require('import-from');
const validatePlugin = require('./validate-plugin');

function createResolver(context, core) {
  return (entry) => {
    const normalised = Array.isArray(entry) ? entry : [entry];
    const [entryPathOrFn, options = {}] = normalised;
    const createEntry =
      typeof entryPathOrFn === 'string'
        ? requireFrom(
            context.cwd,
            entryPathOrFn.replace(/<rootDir>/g, context.cwd)
          )
        : entryPathOrFn;
    validatePlugin(createEntry);
    return createEntry(core, options);
  };
}

module.exports = createResolver;
