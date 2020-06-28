const { createFixture } = require('spire-test-utils');
const { join } = require('path');
const getGitRoot = require('../getGitRoot');

describe('getGitRoot', () => {
  it('resolves root directory if .git directory exists', async () => {
    const fixture = await createFixture(
      {
        '.git/config': `[remote "origin"]
    url = https://github.com/researchgate/spire.git`,
      },
      { git: false }
    );
    const subdir = join(fixture.cwd, 'some/other/sub/folder');
    expect(await getGitRoot(subdir)).toBe(fixture.cwd);
    await fixture.clean();
  });

  it('does not resolve root directory if .git directory does not exists', async () => {
    const fixture = await createFixture({}, { git: false });
    const subdir = join(fixture.cwd, 'some/other/sub/folder');
    expect(await getGitRoot(subdir)).toBeNull();
    await fixture.clean();
  });
});
