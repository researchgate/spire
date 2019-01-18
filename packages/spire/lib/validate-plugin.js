const invariant = require('invariant');

async function validatePlugin(entity) {
  invariant(
    typeof entity === 'function',
    `Config or plugin ${
      entity ? entity.name || '' : ''
    } should export a function`
  );
}

module.exports = validatePlugin;
