function createState(initialState = { linters: [] }) {
  let state = initialState;
  return {
    getState() {
      return state;
    },
    setState(nextState) {
      state =
        typeof nextState === 'function'
          ? { ...state, ...nextState(state) }
          : { ...state, ...nextState };
    },
  };
}

module.exports = createState;
