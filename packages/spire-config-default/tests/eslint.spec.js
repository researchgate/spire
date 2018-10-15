const { createFixture } = require('@rg/spire-test-utils');

const configWithEslintPlugin = JSON.stringify({
  name: 'spire-config-default-test-eslint',
  spire: {
    plugins: [
      '@rg/spire-config-default/eslint',
      '@rg/spire-config-default/lint-staged',
    ],
  },
});

describe('spire-config-default/eslint', () => {
  it('adds lint command', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin,
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire lint/,
    });
    await fixture.clean();
  });

  it('runs eslint and adds linter', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin,
      'invalid.js': 'foo();',
    });
    await fixture.run('git', ['add', 'invalid.js']);
    await expect(
      fixture.run('spire', ['hook', 'precommit', '--debug'])
    ).rejects.toMatchObject({
      stderr: /error\s+'foo' is not defined/,
    });
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
