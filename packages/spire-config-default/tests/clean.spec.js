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
    const { stdout } = await fixture.run('spire', ['--help']);
    expect(stdout).toMatch(/Commands:\s+spire clean/);
    await fixture.clean();
  });

  it('removes matched files', async () => {
    const fixture = await createFixture({
      'package.json': configWithCleanPlugin,
      '.gitignore': 'remove.me',
      'remove.me': 'hi',
    });
    await fixture.run('git', ['init']);
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
    await fixture.run('git', ['init']);
    const { stdout } = await fixture.run('spire', ['clean', '--dry-run']);
    expect(stdout).toMatch(/Next paths are to be cleaned up: remove.me/);
    expect(await pathExists(join(fixture.cwd, 'remove.me'))).toBe(true);
    await fixture.clean();
  });

  it('supports keeplist', async () => {
    const fixture = await createFixture({
      'package.json': configWithCleanPlugin,
      '.gitignore': 'keep.me',
      'keep.me': 'hi',
    });
    await fixture.run('git', ['init']);
    const { stdout } = await fixture.run('spire', [
      'clean',
      '--keeplist',
      'keep.me',
    ]);
    expect(stdout).toMatch(/No paths needs to be cleand up/);
    await fixture.clean();
  });

  it('supports flag to ignore keeplist', async () => {
    const fixture = await createFixture({
      'package.json': configWithCleanPlugin,
      '.gitignore': 'keep.me',
      'keep.me': 'hi',
    });
    await fixture.run('git', ['init']);
    const { stdout } = await fixture.run('spire', [
      'clean',
      '--ignore-keeplist',
    ]);
    expect(stdout).toMatch(/Cleaning keep\.me/);
    expect(stdout).toMatch(/Cleaned 1 path\(s\)/);
    await fixture.clean();
  });
});
