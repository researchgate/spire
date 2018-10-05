module.exports = {
  tabWidth: 4,
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  overrides: [
    {
      files: '*.json',
      options: { tabWidth: 2 },
    },
    {
      files: '*.scss',
      options: { tabWidth: 2 },
    },
  ],
};
