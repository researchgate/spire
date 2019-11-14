module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier', 'unobtrusive'],
  plugins: ['prettier'],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**.spec.js', '**.test.js', '**/__tests__/**.js'],
      env: {
        jest: true,
      },
    },
  ],
};
