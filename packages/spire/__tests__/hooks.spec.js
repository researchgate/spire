const { createFixture, configToString } = require('spire-test-utils');

describe('spire', () => {
  test.each([
    'precommit',
    'postmerge',
    'preinstall',
    'postinstall',
    'preuninstall',
  ])('calls %s plugin hooks', async (hook) => {
    const fixture = await createFixture({
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
            async preinstall({ logger }) {
              logger.log('preinstall');
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
          extends: './spire-config.js',
        },
      }),
    });
    const { stdout, stderr } = await fixture.run('spire', [
      'hook',
      hook,
      '--debug',
    ]);
    expect(stderr).toBe('');
    expect(stdout).toMatch(new RegExp(`Running hooks.${hook}`));
    await fixture.clean();
  });
});
