const { createFixture } = require('spire-test-utils');

const configWithLintStagedPlugin = JSON.stringify({
  name: 'spire-plugin-lint-staged-test',
  spire: {
    plugins: [
      require.resolve('spire-plugin-prettier'),
      require.resolve('spire-plugin-lint-staged'),
    ],
  },
});

const configWithLintStagedPluginOnly = JSON.stringify({
  name: 'spire-plugin-lint-staged-test',
  spire: {
    plugins: [require.resolve('spire-plugin-lint-staged')],
  },
});

describe('spire-plugin-lint-staged', () => {
  it('runs on precommit', async () => {
    const fixture = await createFixture({
      'package.json': configWithLintStagedPlugin,
      'foo.txt': 'hi',
    });
    await fixture.run('git', ['add', 'foo.txt']);
    await expect(
      fixture.run('spire', ['hook', 'precommit', '--debug'])
    ).resolves.toMatchObject({
      stdout: /Using lint-staged arguments:/,
    });
    await fixture.clean();
  });

  it('does not run on empty config', async () => {
    const fixture = await createFixture({
      'package.json': configWithLintStagedPluginOnly,
      'foo.txt': 'hi',
    });
    await fixture.run('git', ['add', 'foo.txt']);
    await expect(
      fixture.run('spire', ['hook', 'precommit', '--debug'])
    ).resolves.toMatchObject({
      stdout: /Skipping lint-staged because no linters are defined/,
    });
    await fixture.clean();
  });
});
