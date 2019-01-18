const { createFixture } = require('spire-test-utils');

describe('spire-plugin-doctoc', () => {
  it('adds markdown linter', async () => {
    const fixture = await createFixture({
      'package.json': JSON.stringify({
        name: 'spire-plugin-doctoc-test',
        spire: {
          plugins: ['spire-plugin-doctoc'],
        },
      }),
    });
    const { stdout } = await fixture.run('spire', [
      'hook',
      'precommit',
      '--debug',
    ]);
    expect(stdout).toMatch(/Using linters:/);
    expect(stdout).toMatch(/\{readme\,contributing\}\.md/);
    await fixture.clean();
  });
});
