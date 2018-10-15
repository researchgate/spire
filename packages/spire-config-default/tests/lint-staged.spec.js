const { createFixture } = require('@rg/spire-test-utils');

const configWithLintStagedPlugin = JSON.stringify({
  name: 'spire-config-default-test-lint-staged',
  spire: {
    plugins: ['@rg/spire-config-default/lint-staged'],
  },
});

describe('spire-config-default/lint-staged', () => {
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
});
