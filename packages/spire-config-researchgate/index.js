module.exports = () => ({
  extends: [
    [
      'spire-config-default',
      {
        eslint: {
          eslintConfig: require.resolve(
            'spire-config-researchgate/config/eslint'
          ),
          allowCustomConfig: false,
        },
        prettier: {
          prettierConfig: require.resolve(
            'spire-config-researchgate/config/prettier'
          ),
          allowCustomConfig: false,
        },
      },
    ],
  ],
});
