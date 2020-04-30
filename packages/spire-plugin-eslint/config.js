module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'prettier'],
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
