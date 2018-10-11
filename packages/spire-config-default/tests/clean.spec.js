const { join } = require('path');
const { pathExists } = require('fs-extra');
const { createFixture } = require('spire-test-utils');

const configWithCleanPlugin = JSON.stringify({
  name: 'spire-config-default-test-clean',
  spire: {
    plugins: ['spire-config-default/clean'],
  },
});

describe('spire-config-default/clean', () => {
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
    expect(stdout).toMatch(/Cleaning remove\.me/);
    expect(stdout).toMatch(/Cleaned 1 path\(s\)/);
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
      stdout: /Next paths are to be cleaned up: remove\.me/,
    });
    expect(await pathExists(join(fixture.cwd, 'remove.me'))).toBe(true);
    await fixture.clean();
  });

  it('supports keeplist', async () => {
    const fixture = await createFixture({
      'package.json': configWithCleanPlugin,
      '.gitignore': 'keep.me',
      'keep.me': 'hi',
    });
    await expect(
      fixture.run('spire', ['clean', '--keeplist', 'keep.me'])
    ).resolves.toMatchObject({
      stdout: /No paths needs to be cleand up/,
    });
    await fixture.clean();
  });

  it('supports flag to ignore keeplist', async () => {
    const fixture = await createFixture({
      'package.json': configWithCleanPlugin,
      '.gitignore': 'keep.me',
      'keep.me': 'hi',
    });
    const { stdout } = await fixture.run('spire', [
      'clean',
      '--ignore-keeplist',
    ]);
    expect(stdout).toMatch(/Cleaning keep\.me/);
    expect(stdout).toMatch(/Cleaned 1 path\(s\)/);
    await fixture.clean();
  });
});
