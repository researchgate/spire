const isCI = require('is-ci');
const { join, dirname, relative } = require('path');
const { pathExists, readFile, outputFile, chmod, remove } = require('fs-extra');
const SpireError = require('../../error');
const getGitRoot = require('../utils/getGitRoot');

const SPIRE_COMMENT_MARK = '# spire';

function hookToString(command) {
  return `
#!/bin/sh
${SPIRE_COMMENT_MARK}
${command}
`;
}

function git(
  { setState, getState },
  {
    gitHooks = {
      'pre-commit': '<spireBin> hook precommit',
      'post-merge': '<spireBin> hook postmerge',
    },
  }
) {
  function shouldSkip(logger) {
    if (isCI) {
      logger.info('Skipped processing git hooks on CI');
      return true;
    }
    const { root } = getState();
    if (!root) {
      logger.warn(
        'Cannot process git hooks because root directory not detected'
      );
      return true;
    }

    return false;
  }

  return {
    name: 'spire-git-support',
    async setup({ cwd }) {
      setState({
        root: await getGitRoot(cwd),
      });
    },
    async postinstall({ logger, resolve }) {
      if (shouldSkip(logger)) {
        return;
      }
      const { root: gitRoot } = getState();
      const spireDir = dirname(resolve('spire/package.json'));
      const spireBin = join(relative(gitRoot, spireDir), 'bin/spire.js');
      logger.debug('Using spire bin for hooks: %s', spireBin);
      for (const hook of Object.keys(gitHooks)) {
        const hookPath = join(gitRoot, '.git/hooks', hook);
        if (await pathExists(hookPath)) {
          const hookContents = await readFile(hookPath, 'utf8');
          if (hookContents.includes(SPIRE_COMMENT_MARK)) {
            continue;
          }
          throw new SpireError(
            [
              `Git ${hook} hook is already installed.`,
              "Make sure you're not using husky or any other similar tools.",
              'To continue, remove `.git/hooks/` folder and try again.',
            ].join(' ')
          );
        }
        const hookCommand = gitHooks[hook].replace(/<spireBin>/g, spireBin);
        await outputFile(hookPath, hookToString(hookCommand), 'utf8');
        await chmod(hookPath, '744'); // a+x
      }
    },
    async preuninstall({ logger }) {
      if (shouldSkip(logger)) {
        return;
      }
      const { root: gitRoot } = getState();
      for (const hook of Object.keys(gitHooks)) {
        const hookPath = join(gitRoot, '.git/hooks', hook);
        if (await pathExists(hookPath)) {
          const hookContents = await readFile(hookPath, 'utf8');
          if (hookContents.includes(SPIRE_COMMENT_MARK)) {
            await remove(hookPath);
          }
        }
      }
    },
  };
}

module.exports = git;
