const { createFixture, configToString } = require('@rg/spire-test-utils');

describe('spire', () => {
  it('resolves extended configs', async () => {
    const fixture = await createFixture({
      'spire-config-foo.js': configToString(() => ({
        plugins: [
          () => ({
            name: 'foo',
            async setup({ logger }) {
              logger.log('foo');
            },
          }),
        ],
      })),
      'spire-config-bar.js': configToString(() => ({
        extends: require.resolve('./spire-config-foo'),
        plugins: [
          () => ({
            name: 'bar',
            async setup({ logger }) {
              logger.log('bar');
            },
          }),
        ],
      })),
      'spire-config-baz.js': configToString(() => ({
        extends: require.resolve('./spire-config-bar'),
        plugins: [
          () => ({
            name: 'baz',
            async setup({ logger }) {
              logger.log('baz');
            },
          }),
        ],
      })),
      'package.json': JSON.stringify({
        name: 'spire-test-config',
        spire: {
          extends: '<rootDir>/spire-config-baz.js',
        },
      }),
    });
    const { stdout } = await fixture.run('spire', ['--debug'], {
      reject: false,
    });
    expect(stdout).toMatch(/Using resolved config:/);
    expect(stdout).toMatch(/spire-config-baz/);
    expect(stdout).toMatch(/spire-config-bar/);
    expect(stdout).toMatch(/spire-config-foo/);
    expect(stdout).toMatch(/Running baz\.setup/);
    expect(stdout).toMatch(/Running bar\.setup/);
    expect(stdout).toMatch(/Running foo\.setup/);
    await fixture.clean();
  });
});
