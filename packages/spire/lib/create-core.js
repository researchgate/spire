const { join } = require('path');
const { pathExists, readJson } = require('fs-extra');

function createCore({ cwd }, { setState, getState }) {
  return {
    setState,
    getState,
    // Check if project contains specific file
    async hasFile(file) {
      return await pathExists(join(cwd, file));
    },
    // Check if project's package.json contains specific prop
    async hasPackageProp(prop) {
      return (await readJson(join(cwd, 'package.json'))).hasOwnProperty(prop);
    },
  };
}

module.exports = createCore;
