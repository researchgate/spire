const execa = require('execa');
const SpireError = require('spire/error');

function spireLintersToLintStaged(/** @type Array<{}> */ linters) {
  const result = {};
  // Merge array of linters into single lint-staged object
  for (const linter of linters) {
    for (const glob of Object.keys(linter)) {
      const command = linter[glob].join(' ');
      result[glob] = result.hasOwnProperty(glob)
        ? [...result[glob], command]
        : [command];
    }
  }
  // Append `git add` at the end of each linter
  for (const glob of Object.keys(result)) {
    result[glob] = [...result[glob], 'git add'];
  }
  return result;
}

function lintStaged(
  { hasFile, hasPackageProp, setState, getState },
  {
    config: defaultLintStagedConfig = 'spire-plugin-lint-staged/config',
    allowCustomConfig = true,
  }
) {
  return {
    name: 'spire-plugin-lint-staged',
    async setup() {
      const hasUserConfig =
        (await hasFile('.lintstagedrc')) ||
        (await hasFile('lint-staged.config.js')) ||
        (await hasPackageProp('lint-staged'));
      setState({
        lintStagedArgs:
          allowCustomConfig && hasUserConfig
            ? []
            : ['--config', defaultLintStagedConfig],
      });
      // Inform user about disallowed overrides
      if (hasUserConfig && !allowCustomConfig) {
        throw new SpireError(
          `Custom lint-staged config is not allowed, using ${defaultLintStagedConfig} instead`
        );
      }
    },
    async precommit({ cwd, logger }) {
      const { lintStagedArgs, linters: spireLinters } = getState();
      const linters = spireLintersToLintStaged(spireLinters);
      logger.debug('Using lint-staged arguments: %s', lintStagedArgs.join(' '));
      const env = { SPIRE_LINTERS: JSON.stringify(linters) };
      await execa('lint-staged', lintStagedArgs, {
        cwd,
        env,
        stdio: 'inherit',
        preferLocal: true,
      });
    },
  };
}

module.exports = lintStaged;
