const { createFixture } = require('spire-test-utils');

describe('spire', () => {
  it('verifies git repository', async () => {
    const fixture = await createFixture({
      'package.json': JSON.stringify({
        name: 'spire-verify',
      }),
    });
    await expect(fixture.run('spire', ['--debug'])).rejects.toMatchObject({
      stderr: /Project is not in a Git repository\. Set `SKIP_PREFLIGHT_CHECK=true` to disable this check, but be advised that some plugins may fail\./,
    });
    await fixture.clean();
  });

  it('allows to skip git check', async () => {
    const fixture = await createFixture(
      {
        'package.json': JSON.stringify({
          name: 'spire-verify',
          spire: { extends: [] },
        }),
      },
      { git: false }
    );
    await expect(
      fixture.run('spire', ['--help'], { env: { SKIP_PREFLIGHT_CHECK: true } })
    ).resolves.toBeDefined();
    await fixture.clean();
  });

  it('fails with unknown command', async () => {
    const fixture = await createFixture({
      'package.json': JSON.stringify({
        name: 'spire-cli',
        spire: { extends: [] },
      }),
    });
    await expect(fixture.run('spire', ['nope'])).rejects.toMatchObject({
      stderr: expect.stringMatching(/Unknown command: nope/),
    });
  });
});
