function doctoc(
  { setState },
  {
    args: defaultArgs = ['--maxlevel 3', '--notitle'],
    glob = '{readme,contributing}.md',
  }
) {
  return {
    name: 'spire-plugin-doctoc',
    async setup() {
      setState({ doctocArgs: defaultArgs });
    },
    async precommit() {
      setState(state => ({
        linters: [
          ...state.linters,
          { [glob]: ['doctoc', ...state.doctocArgs] },
        ],
      }));
    },
  };
}

module.exports = doctoc;
