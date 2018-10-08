function doctoc(
  { setState },
  {
    doctocArgs: defaultDoctocArgs = ['--maxlevel 3', '--notitle'],
    linterGlob = '{readme,contributing}.md',
  }
) {
  return {
    name: 'spire-config-default/doctoc',
    async setup() {
      setState({ doctocArgs: defaultDoctocArgs });
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
