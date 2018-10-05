const { join } = require('path');
const { pathExists, readJson } = require('fs-extra');

function createCore({ cwd }, { setState, getState }) {
  return {
    setState,
    getState,
    stop() {
      return setState({ stopped: true });
    },
    getCommand() {
      return getState().command;
    },
    setCommand(command) {
      return setState({ command });
    },
    // Check if project contains specific file
    async hasFile(file) {
      return await pathExists(join(cwd, file));
    },
    // Check if project's package.json contains specific prop
    async hasPackageProp(prop) {
      const pkgData = await readJson(join(cwd, 'package.json'));
      return prop in pkgData;
    },
  };
}

module.exports = createCore;
