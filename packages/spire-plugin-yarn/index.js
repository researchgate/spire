const { join, parse } = require('path');
const { pathExists } = require('fs-extra');
const execa = require('execa');

function yarn(
  spire,
  { deduplicateStrategy = 'highest', lockFileName = 'yarn.lock' }
) {
  return {
    name: 'spire-plugin-yarn',
    async preinstall({ cwd }) {
      await execa('use-yarn', [], { cwd, stdio: 'inherit', preferLocal: true });
    },
    async postinstall({ cwd, logger }) {
      const systemRoot = parse(cwd).root;
      let yarnLockFileRoot = cwd;
      while (!(await pathExists(join(yarnLockFileRoot, lockFileName)))) {
        yarnLockFileRoot = join(yarnLockFileRoot, '..');
        if (yarnLockFileRoot === systemRoot) break;
      }
      if (yarnLockFileRoot === systemRoot) {
        logger.error('Failed to locate %s file', lockFileName);
        return;
      }
      logger.debug('Running `yarn-deduplicate` in %s', yarnLockFileRoot);
      await execa('yarn-deduplicate', ['--strategy', deduplicateStrategy], {
        cwd: yarnLockFileRoot,
        stdio: 'inherit',
        preferLocal: true,
      });
    },
  };
}

module.exports = yarn;
