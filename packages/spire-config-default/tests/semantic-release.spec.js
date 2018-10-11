const { createFixture } = require('spire-test-utils');

const configWithSemanticReleasePlugin = JSON.stringify({
  name: 'spire-config-default-test-semantic-release',
  spire: {
    plugins: ['spire-config-default/semantic-release'],
  },
});

describe('spire-config-default/semantic-release', () => {
  it('adds release command', async () => {
    const fixture = await createFixture({
      'package.json': configWithSemanticReleasePlugin,
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire release/,
    });
    await fixture.clean();
  });

  it('passes custom arguments to semantic-release', async () => {
    const fixture = await createFixture({
      'package.json': configWithSemanticReleasePlugin,
    });
    await expect(
      fixture.run('spire', ['release', '--debug', '--', '--version'])
    ).resolves.toMatchObject({
      stdout: /v\d\.\d\.\d/,
    });
    await fixture.clean();
  });
});
