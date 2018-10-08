function doctoc({ setState }, { linterGlob = '{readme,contributing}.md' }) {
  return {
    name: 'spire-config-default/doctoc',
    async setup() {
      setState({
        doctocArgs: ['--maxlevel 3', '--notitle'],
      });
    },
    async precommit() {
      setState(state => ({
        linters: [
          ...state.linters,
          { [linterGlob]: ['doctoc', ...state.doctocArgs] },
        ],
      }));
    },
  };
}

module.exports = doctoc;
