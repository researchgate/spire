const requireFrom = require('import-from');
const validatePlugin = require('./validate-plugin');

function createResolver(context, core) {
  return entry => {
    const normalised = Array.isArray(entry) ? entry : [entry];
    const [entryPathOrFn, options = {}] = normalised;
    const createEntry =
      typeof entryPathOrFn === 'string'
        ? requireFrom(
            context.cwd,
            entryPathOrFn.replace(
              /<rootDir>/g,
              // `INIT_CWD` is set by both npm and yarn, which represent an actual path
              // where the command was executed from. We'll use it if set to properly
              // resolve workspace root.
              context.env.INIT_CWD || context.cwd
            )
          )
        : entryPathOrFn;
    validatePlugin(createEntry);
    return createEntry(core, options);
  };
}

module.exports = createResolver;
