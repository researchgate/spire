module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier', 'unobtrusive'],
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
