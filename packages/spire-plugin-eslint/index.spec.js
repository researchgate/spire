const { createFixture } = require('spire-test-utils');

const configWithEslintPlugin = JSON.stringify({
  name: 'spire-plugin-eslint-test',
  spire: {
    plugins: [require.resolve('spire-plugin-eslint')],
  },
});

describe('spire-plugin-eslint', () => {
  it('adds lint command', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin,
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire lint/,
    });
    await fixture.clean();
  });

  it('adds eslint linter', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin,
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

  it('passes custom arguments to eslint', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin,
    });
    await expect(
      fixture.run('spire', ['lint', '--', '--version'])
    ).resolves.toMatchObject({
      stdout: /v\d\.\d\.\d/,
    });
    await fixture.clean();
  });
});
