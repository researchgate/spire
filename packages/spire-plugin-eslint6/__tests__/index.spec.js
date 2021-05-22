const { createFixture } = require('spire-test-utils');
const { stat, readFile } = require('fs-extra');
const { join } = require('path');

const configWithEslintPlugin = (options = {}) =>
  JSON.stringify({
    name: 'spire-plugin-eslint6-test',
    spire: {
      plugins: [[require.resolve('spire-plugin-eslint6'), options]],
    },
  });

describe('spire-plugin-eslint6', () => {
  test('adds lint command', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin(),
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire lint/,
    });
    await fixture.clean();
  });

  test('adds eslint linter', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin(),
    });
    const { stdout } = await fixture.run('spire', [
      'hook',
      'precommit',
      '--debug',
    ]);
    expect(stdout).toMatch(/Using linters:/);
    expect(stdout).toMatch(/\*\.\(js\|jsx\|mjs\|ts\|tsx\)/);
    await fixture.clean();
  });

  test('passes custom arguments to eslint', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin(),
    });
    await expect(
      fixture.run('spire', ['lint', '--version'])
    ).resolves.toMatchObject({
      stdout: /v\d\.\d\.\d/,
    });
    await fixture.clean();
  });

  test('creates default eslint config for editors', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin(),
    });
    await fixture.run('spire', ['hook', 'postinstall']);
    const eslintConfig = join(fixture.cwd, '.eslintrc.js');
    expect(await stat(eslintConfig)).toBeTruthy();
    expect(await readFile(eslintConfig, 'UTF-8')).toMatch(
      /spire-plugin-eslint6\/config/
    );
    await fixture.clean();
  });

  test('prints deprecation warning for glob option', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin({ glob: 'abc' }),
    });
    await fixture.run('spire', ['hook', 'precommit']);

    await expect(
      fixture.run('spire', ['hook', 'precommit'])
    ).resolves.toMatchObject({
      stdout:
        /The glob option is deprecated\. Use the option `fileExtensions` instead\./,
    });
    await fixture.clean();
  });

  test('creates custom eslint config for editors', async () => {
    const fixture = await createFixture({
      'node_modules/eslint6-config-cool-test/package.json': JSON.stringify({
        name: 'eslint6-config-cool-test',
        version: '1.0.0',
        main: 'index.js',
      }),
      'node_modules/eslint6-config-cool-test/index.js': 'module.exports = {};',
      'package.json': configWithEslintPlugin({
        config: 'eslint6-config-cool-test',
      }),
    });
    await fixture.run('spire', ['hook', 'postinstall']);
    const eslintConfig = join(fixture.cwd, '.eslintrc.js');
    expect(await stat(eslintConfig)).toBeTruthy();
    expect(await readFile(eslintConfig, 'UTF-8')).toMatch(
      /eslint6-config-cool-test/
    );
    await fixture.clean();
  });

  test('warns about custom eslint config not extending default config', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin(),
      '.eslintrc.json': '',
    });
    await expect(
      fixture.run('spire', ['hook', 'postinstall'])
    ).resolves.toMatchObject({
      stdout: expect.stringMatching(
        'Attempted to set ESLint config but it already exists. Please ensure existing config re-exports'
      ),
    });
    await fixture.clean();
  });
});
