const { join } = require('path');
const { pathExists } = require('fs-extra');
const { createFixture } = require('spire-test-utils');

const configWithCleanPlugin = JSON.stringify({
  name: 'spire-plugin-clean-test',
  spire: {
    plugins: [require.resolve('spire-plugin-clean')],
  },
});

describe('spire-plugin-clean', () => {
  it('adds clean command', async () => {
    const fixture = await createFixture({
      'package.json': configWithCleanPlugin,
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire clean/,
    });
    await fixture.clean();
  });

  it('removes matched files', async () => {
    const fixture = await createFixture({
      'package.json': configWithCleanPlugin,
      '.gitignore': 'remove.me',
      'remove.me': 'hi',
    });
    expect(await pathExists(join(fixture.cwd, 'remove.me'))).toBe(true);
    const { stdout } = await fixture.run('spire', ['clean']);
    expect(stdout).toMatch(/Removing remove\.me/);
    expect(await pathExists(join(fixture.cwd, 'remove.me'))).toBe(false);
    await fixture.clean();
  });

  it('supports dry-run mode', async () => {
    const fixture = await createFixture({
      'package.json': configWithCleanPlugin,
      '.gitignore': 'remove.me',
      'remove.me': 'hi',
    });
    await expect(
      fixture.run('spire', ['clean', '--dry-run'])
    ).resolves.toMatchObject({
      stdout: /Would remove remove\.me/,
    });
    expect(await pathExists(join(fixture.cwd, 'remove.me'))).toBe(true);
    await fixture.clean();
  });
});
