const { createFixture } = require('spire-test-utils');

const configWithPrettierPlugin = JSON.stringify({
  name: 'spire-plugin-prettier-test',
  spire: {
    plugins: [require.resolve('spire-plugin-prettier')],
  },
});

describe('spire-plugin-prettier', () => {
  it('adds format command', async () => {
    const fixture = await createFixture({
      'package.json': configWithPrettierPlugin,
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire format/,
    });
    await fixture.clean();
  });

  it('adds linter prettier', async () => {
    const fixture = await createFixture({
      'package.json': configWithPrettierPlugin,
    });
    const { stdout } = await fixture.run('spire', [
      'hook',
      'precommit',
      '--debug',
    ]);
    expect(stdout).toMatch(/Using linters:/);
    expect(stdout).toMatch('**/*.+(js|json|less|css|ts|tsx|md)');
    await fixture.clean();
  });

  it('passes custom arguments to prettier', async () => {
    const fixture = await createFixture({
      'package.json': configWithPrettierPlugin,
    });
    await expect(
      fixture.run('spire', ['format', '--version'])
    ).resolves.toMatchObject({
      stdout: /v\d\.\d\.\d/,
    });
    await fixture.clean();
  });
});
