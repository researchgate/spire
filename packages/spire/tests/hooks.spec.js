const { createFixture, configToString } = require('spire-test-utils');

describe('spire', () => {
  test.each(['precommit', 'postmerge', 'postinstall', 'preuninstall'])(
    'calls %s plugin hooks',
    async hook => {
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
            extends: '<rootDir>/spire-config.js',
          },
        }),
      });
      const { stdout } = await fixture.run('spire', ['hook', hook, '--debug']);
      expect(stdout).toMatch(new RegExp(`Running hooks\.${hook}`));
      await fixture.clean();
    }
  );
});
