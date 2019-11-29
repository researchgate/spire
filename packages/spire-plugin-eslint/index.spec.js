const { createFixture } = require('spire-test-utils');
const { stat, readFile } = require('fs-extra');
const { join } = require('path');

const configWithEslintPlugin = config =>
  JSON.stringify({
    name: 'spire-plugin-eslint-test',
    spire: {
      plugins: [[require.resolve('spire-plugin-eslint'), { config }]],
    },
  });

describe('spire-plugin-eslint', () => {
  it('adds lint command', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin(),
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire lint/,
    });
    await fixture.clean();
  });

  it('adds eslint linter', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin(),
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
      'package.json': configWithEslintPlugin(),
    });
    await expect(
      fixture.run('spire', ['lint', '--version'])
    ).resolves.toMatchObject({
      stdout: /v\d\.\d\.\d/,
    });
    await fixture.clean();
  });

  it('creates default eslint config for editors', async () => {
    const fixture = await createFixture({
      'package.json': configWithEslintPlugin(),
    });
    await fixture.run('spire', ['hook', 'postinstall']);
    const eslintConfig = join(fixture.cwd, '.eslintrc.js');
    expect(stat(eslintConfig)).resolves.toBeTruthy();
    expect(readFile(eslintConfig, 'UTF-8')).resolves.toMatch(
      /spire-plugin-eslint\/config/
    );
    await fixture.clean();
  });

  it('creates custom eslint config for editors', async () => {
    // Does not yet work, as spire is trying to resolve configs starting from the plugin
    // folder. It should use require.resolve(x, { paths }) from node 8.9 to search in the cwd instead
    const fixture = await createFixture({
      'node_modules/eslint-config-cool-test/package.json': JSON.stringify({
        name: 'eslint-config-cool-test',
        version: '1.0.0',
        main: 'index.js',
      }),
      'node_modules/eslint-config-cool-test/index.js': 'module.exports = {};',
      'package.json': configWithEslintPlugin('eslint-config-cool-test'),
    });
    await fixture.run('spire', ['hook', 'postinstall']);
    const eslintConfig = join(fixture.cwd, '.eslintrc.js');
    expect(stat(eslintConfig)).resolves.toBeTruthy();
    expect(readFile(eslintConfig, 'UTF-8')).resolves.toMatch(
      /eslint-config-cool-test/
    );
    await fixture.clean();
  });
});
