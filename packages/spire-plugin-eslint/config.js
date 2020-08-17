module.exports = {
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'script',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    es6: true,
    node: true,
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
