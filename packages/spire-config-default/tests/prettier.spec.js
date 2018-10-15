const { join } = require('path');
const { readFile } = require('fs-extra');
const { createFixture } = require('@rg/spire-test-utils');

const configWithPrettierPlugin = JSON.stringify({
  name: 'spire-config-default-test-prettier',
  spire: {
    plugins: [
      '@rg/spire-config-default/prettier',
      '@rg/spire-config-default/lint-staged',
    ],
  },
});

describe('spire-config-default/prettier', () => {
  it('adds format command', async () => {
    const fixture = await createFixture({
      'package.json': configWithPrettierPlugin,
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire format/,
    });
    await fixture.clean();
  });

  it('runs prettier and adds linter', async () => {
    const fixture = await createFixture({
      'package.json': configWithPrettierPlugin,
      'unformatted.js': '\nfoo  (  )  ',
    });
    await fixture.run('git', ['add', 'unformatted.js']);
    await fixture.run('spire', ['hook', 'precommit', '--debug']);
    expect(
      await readFile(join(fixture.cwd, 'unformatted.js'), 'utf8')
    ).toMatchSnapshot();
    await fixture.clean();
  });

  it('passes custom arguments to prettier', async () => {
    const fixture = await createFixture({
      'package.json': configWithPrettierPlugin,
    });
    await expect(
      fixture.run('spire', ['format', '--', '--version'])
    ).resolves.toMatchObject({
      stdout: /v\d\.\d\.\d/,
    });
    await fixture.clean();
  });
});
