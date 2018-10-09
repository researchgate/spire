const { join } = require('path');
const execa = require('execa');
const { createDirFixture, configToString } = require('spire-test-utils');
const fixturesDir = join(__dirname, '__fixtures__');

describe('Config', () => {
  it('resolves extended configs', async () => {
    const cwd = join(fixturesDir, 'config');
    const cleanup = await createDirFixture(cwd, {
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
          extends: join(cwd, './spire-config-baz'),
        },
      }),
    });
    const output = await execa.stdout('spire', ['--debug'], {
      reject: false,
      cwd,
    });
    expect(output).toMatch(/Using config:/);
    expect(output).toMatch(/config\/spire-config-baz/);
    expect(output).toMatch(/config\/spire-config-bar/);
    expect(output).toMatch(/config\/spire-config-foo/);
    expect(output).toMatch(/Running baz\.setup/);
    expect(output).toMatch(/Running bar\.setup/);
    expect(output).toMatch(/Running foo\.setup/);
    await cleanup();
  });
});
