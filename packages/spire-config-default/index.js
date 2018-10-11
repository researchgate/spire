const clean = require('./clean');
const doctoc = require('./doctoc');
const prettier = require('./prettier');
const eslint = require('./eslint');
const jest = require('./jest');
const semanticRelease = require('./semantic-release');
const lintStaged = require('./lint-staged');

// Skip disabled plugins
function shouldKeepPlugin(entry) {
  const [, options] = entry;
  return options === false ? false : true;
}

module.exports = (
  spire,
  {
    clean: cleanOpts = {},
    doctoc: doctocOpts = {},
    prettier: formatOpts = {},
    eslint: eslintOpts = {},
    jest: jestOpts = {},
    semanticRelease: semanticReleaseOpts = {},
    lintStaged: lintStagedOpts = {},
  }
) => ({
  plugins: [
    [clean, cleanOpts],
    [doctoc, doctocOpts],
    [prettier, formatOpts],
    [eslint, eslintOpts],
    [jest, jestOpts],
    [semanticRelease, semanticReleaseOpts],
    [lintStaged, lintStagedOpts],
  ].filter(shouldKeepPlugin),
});
