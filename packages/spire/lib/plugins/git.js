const isCI = require('is-ci');
const { join } = require('path');
const execa = require('execa');
const { pathExists, readFile, outputFile, chmod, remove } = require('fs-extra');
const SpireError = require('@rg/spire/error');

const SPIRE_COMMENT_MARK = '# spire';

function hookToString(command) {
  return `
#!/bin/sh
${SPIRE_COMMENT_MARK}
${command}
`;
}

function git(
  { getCommand, setState, getState },
  {
    gitHooks = {
      'pre-commit': 'npx spire hook precommit',
      'post-merge': 'npx spire hook postmerge',
    },
  }
) {
  return {
    name: 'spire-git-support',
    async setup({ cwd }) {
      // Make sure project is a Git repo
      try {
        setState({
          root: await execa.stdout('git', ['rev-parse', '--show-toplevel'], {
            cwd,
          }),
        });
      } catch (reason) {
        throw new SpireError('Project needs to be in a Git repository');
      }
    },
    async skip({ logger }) {
      logger.debug('Skipping installing hooks on CI');
      return isCI;
    },
    async run() {
      const gitRoot = getState().root;
      switch (getCommand()) {
        case Symbol.for('postinstall'):
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
                  "Make sure you're not using husky or any other similiar tools.",
                  'To continue, remove `.git/hooks/` folder any try again.',
                ].join(' ')
              );
            }
            await outputFile(hookPath, hookToString(gitHooks[hook]), 'utf8');
            await chmod(hookPath, '744'); // a+x
          }
          break;
        case Symbol.for('preuninstall'):
          for (const hook of Object.keys(gitHooks)) {
            const hookPath = join(gitRoot, '.git/hooks', hook);
            if (await pathExists(hookPath)) {
              const hookContents = await readFile(hookPath, 'utf8');
              if (hookContents.includes(SPIRE_COMMENT_MARK)) {
                await remove(hookPath);
              }
            }
          }
          break;
        default:
          return;
      }
    },
  };
}

module.exports = git;
