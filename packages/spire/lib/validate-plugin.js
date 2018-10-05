const invariant = require('invariant');

async function validatePlugin(plugin) {
  invariant(
    typeof plugin === 'function',
    `Plugin ${plugin ? plugin.name || '' : ''} must be a function`
  );
}

module.exports = validatePlugin;
