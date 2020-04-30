const { Signale } = require('signale');
const types = require('signale/types');

function withStream(type) {
  return (stream) => {
    return { ...type, stream };
  };
}

function createLogger({ stdout, stderr, argv }) {
  // CLI arguments are not parsed until `run` hook, but we want to inject logger
  // as soon as posssible to allow using it in `setup` too
  const isDebug = Boolean(argv.find((arg) => arg === '--debug'));
  return new Signale({
    config: {
      displayTimestamp: false,
      underlineMessage: false,
      displayLabel: false,
    },
    disabled: false,
    interactive: false,
    scope: 'spire',
    stream: [stdout],
    types: {
      ...types,
      debug: withStream(types.note)(isDebug ? [stdout] : []),
      error: withStream(types.error)([stderr]),
      fatal: withStream(types.fatal)([stderr]),
    },
  });
}

module.exports = createLogger;
