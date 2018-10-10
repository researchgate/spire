const { join } = require('path');
const { readFile } = require('fs-extra');
const { createFixture } = require('spire-test-utils');

const configWithDoctocPlugin = JSON.stringify({
  name: 'spire-config-default-test-doctoc',
  spire: {
    plugins: [
      'spire-config-default/doctoc',
      'spire-config-default/lint-staged',
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
    await fixture.run('git', ['init']);
    await fixture.run('git', ['add', 'readme.md']);
    const { stdout } = await fixture.run('spire', [
      'hook',
      'precommit',
      '--debug',
    ]);
    expect(stdout).toMatch(/Running spire-config-default\/doctoc\.precommit/);
    expect(
      await readFile(join(fixture.cwd, 'readme.md'), 'utf8')
    ).toMatchSnapshot();
    await fixture.clean();
  });
});
