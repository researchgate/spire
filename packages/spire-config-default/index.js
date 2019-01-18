module.exports = (
  spire,
  {
    clean = {},
    doctoc = {},
    eslint = {},
    jest = {},
    prettier = {},
    'semantic-release': semanticRelease = {},
    'lint-staged': lintStaged = {},
  }
) => ({
  plugins: [
    ['spire-plugin-clean', clean],
    ['spire-plugin-doctoc', doctoc],
    ['spire-plugin-eslint', eslint],
    ['spire-plugin-jest', jest],
    ['spire-plugin-prettier', prettier],
    ['spire-plugin-semantic-release', semanticRelease],
    ['spire-plugin-lint-staged', lintStaged],
  ]
    .filter(entry => {
      // Skip disabled plugins
      const [, options] = entry;
      return options === false ? false : true;
    })
    .map(entry => {
      // Expand string `'<value>'` to a `{ config: '<value>' }`
      const [plugin, options] = entry;
      return typeof options === 'string'
        ? [plugin, { config: options }]
        : entry;
    }),
});
