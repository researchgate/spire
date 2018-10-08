const SpireError = require('spire/error');
const execa = require('execa');

function verify({ setState }) {
  return {
    name: 'spire-config-default/verify',
    async setup() {
      // Make sure project is a Git repo
      try {
        setState({
          root: await execa('git', ['rev-parse', '--show-toplevel']),
        });
      } catch (reason) {
        throw new SpireError('Project needs to be in a Git repository');
      }
    },
  };
}

module.exports = verify;
