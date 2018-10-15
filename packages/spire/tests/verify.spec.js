const { createFixture } = require('@rg/spire-test-utils');

describe('spire', () => {
  it('verifies git repository', async () => {
    const fixture = await createFixture({
      'package.json': JSON.stringify({
        name: 'spire-verify',
      }),
    });
    await expect(fixture.run('spire', ['--debug'])).rejects.toMatchObject({
      stderr: /Project needs to be in a Git repository/,
    });
    await fixture.clean();
  });
});
