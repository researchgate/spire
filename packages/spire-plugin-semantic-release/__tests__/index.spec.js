const { createFixture } = require('spire-test-utils');

const configWithSemanticReleasePlugin = JSON.stringify({
  name: 'spire-plugin-semantic-release-test',
  repository: 'researchgate/spire',
  spire: {
    plugins: [
      [require.resolve('spire-plugin-semantic-release'), { provider: 'none' }],
    ],
  },
});

describe('spire-plugin-semantic-release', () => {
  test('adds release command', async () => {
    const fixture = await createFixture({
      'package.json': configWithSemanticReleasePlugin,
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire release/,
    });
    await fixture.clean();
  });

  test('passes custom arguments to semantic-release', async () => {
    const fixture = await createFixture({
      'package.json': configWithSemanticReleasePlugin,
    });
    await expect(
      fixture.run('spire', ['--debug', 'release', '--dry-run'])
    ).resolves.toMatchObject({
      stdout: /Using semantic-release arguments: .*--dry-run.*/,
    });
    await fixture.clean();
  }, 25000);
});
