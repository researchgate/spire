const verify = require('./verify');
const clean = require('./clean');
const doctoc = require('./doctoc');
const prettier = require('./prettier');
const eslint = require('./eslint');
const jest = require('./jest');
const semanticRelease = require('./semantic-release');
const lintStaged = require('./lint-staged');

module.exports = (
  spire,
  {
    verify: verifyOpts = {},
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
    [verify, verifyOpts],
    [clean, cleanOpts],
    [doctoc, doctocOpts],
    [prettier, formatOpts],
    [eslint, eslintOpts],
    [jest, jestOpts],
    [semanticRelease, semanticReleaseOpts],
    [lintStaged, lintStagedOpts],
  ],
});
