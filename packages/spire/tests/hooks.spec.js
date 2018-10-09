const { join } = require('path');
const execa = require('execa');
const { createDirFixture, configToString } = require('spire-test-utils');
const fixturesDir = join(__dirname, '__fixtures__');

describe('Hooks', () => {
  it('calls plugin hooks', async () => {
    const cwd = join(fixturesDir, 'hooks');
    const cleanup = await createDirFixture(cwd, {
      'spire-config.js': configToString(() => ({
        plugins: [
          () => ({
            name: 'hooks',
            async precommit({ logger }) {
              logger.log('precommit');
            },
            async postmerge({ logger }) {
              logger.log('postmerge');
            },
            async postinstall({ logger }) {
              logger.log('postinstall');
            },
            async preuninstall({ logger }) {
              logger.log('preuninstall');
            },
          }),
        ],
      })),
      'package.json': JSON.stringify({
        name: 'spire-test-hooks',
        spire: {
          extends: join(cwd, 'spire-config.js'),
        },
      }),
    });
    for (const hook of [
      'precommit',
      'postmerge',
      'postinstall',
      'preuninstall',
    ]) {
      expect(
        await execa.stdout('spire', ['hook', hook, '--debug'], { cwd })
      ).toMatch(new RegExp(`Running hooks\.${hook}`));
    }
    await cleanup();
  });
});
