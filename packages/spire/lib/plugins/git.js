const isCI = require('is-ci');
const { join, dirname, relative } = require('path');
const execa = require('execa');
const { pathExists, readFile, outputFile, chmod, remove } = require('fs-extra');
const SpireError = require('spire/error');

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
      'pre-commit': '<spireBin> hook precommit',
      'post-merge': '<spireBin> hook postmerge',
    },
  }
) {
  return {
    name: 'spire-git-support',
    async setup({ cwd, env }) {
      try {
        setState({
          root: (
            await execa('git', ['rev-parse', '--show-toplevel'], {
              cwd,
            })
          ).stdout,
        });
      } catch (reason) {
        if (Boolean(env.SKIP_PREFLIGHT_CHECK)) {
          setState({ root: cwd });
        } else {
          throw new SpireError(
            [
              'Project is not in a Git repository.',
              'Set `SKIP_PREFLIGHT_CHECK=true` to disable this check,',
              'but be advised that some plugins may fail.\n',
              'Caused by:\n',
              reason.message,
            ].join(' ')
          );
        }
      }
    },
    async skip({ logger }) {
      if (isCI) {
        logger.debug('Skipping installing hooks on CI');
        return true;
      }
    },
    async run({ logger }) {
      const gitRoot = getState().root;
      const spireDir = dirname(require.resolve('spire/package.json'));
      const spireBin = join(relative(gitRoot, spireDir), 'bin/spire.js');
      logger.debug('Using spire bin for hooks: %s', spireBin);
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
                  "Make sure you're not using husky or any other similar tools.",
                  'To continue, remove `.git/hooks/` folder and try again.',
                ].join(' ')
              );
            }
            const hookCommand = gitHooks[hook].replace(
              /\<spireBin\>/g,
              spireBin
            );
            await outputFile(hookPath, hookToString(hookCommand), 'utf8');
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
