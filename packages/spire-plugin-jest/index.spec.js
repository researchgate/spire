const { createFixture } = require('spire-test-utils');

const configWithJestPlugin = JSON.stringify({
  name: 'spire-plugin-jest-test',
  spire: {
    plugins: ['spire-plugin-jest'],
  },
});

describe('spire-plugin-jest', () => {
  it('adds test command', async () => {
    const fixture = await createFixture({
      'package.json': configWithJestPlugin,
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire test/,
    });
    await fixture.clean();
  });

  it('adds jest linter', async () => {
    const fixture = await createFixture({
      'package.json': configWithJestPlugin,
    });
    const { stdout } = await fixture.run('spire', [
      'hook',
      'precommit',
      '--debug',
    ]);
    expect(stdout).toMatch(/Using linters:/);
    expect(stdout).toMatch(/\.js/);
    await fixture.clean();
  });

  it('passes custom arguments to jest', async () => {
    const fixture = await createFixture({
      'package.json': configWithJestPlugin,
    });
    await expect(
      fixture.run('spire', ['test', '--', '--version'])
    ).resolves.toMatchObject({
      stdout: /v\d\.\d\.\d/,
    });
    await fixture.clean();
  });
});
