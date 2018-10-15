const { join } = require('path');
const { readFile } = require('fs-extra');
const { createFixture } = require('@rg/spire-test-utils');

const configWithDoctocPlugin = JSON.stringify({
  name: 'spire-config-default-test-doctoc',
  spire: {
    plugins: [
      '@rg/spire-config-default/doctoc',
      '@rg/spire-config-default/lint-staged',
    ],
  },
});

describe('spire-config-default/doctoc', () => {
  it('adds markdown linter', async () => {
    const fixture = await createFixture({
      'package.json': configWithDoctocPlugin,
      'readme.md': `
# First
## Second
### Third
      `,
    });
    await fixture.run('git', ['add', 'readme.md']);
    await expect(
      fixture.run('spire', ['hook', 'precommit', '--debug'])
    ).resolves.toMatchObject({
      stdout: /Running spire-config-default\/doctoc\.precommit/,
    });
    expect(
      await readFile(join(fixture.cwd, 'readme.md'), 'utf8')
    ).toMatchSnapshot();
    await fixture.clean();
  });
});
