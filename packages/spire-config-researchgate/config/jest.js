module.exports = {
  name: 'researchgate',
  setupTestFrameworkScriptFile: require.resolve(
    'spire-config-researchgate/setup-test-framework'
  ),
  modulePathIgnorePatterns: ['<rootDir>/.cache/'],
};
