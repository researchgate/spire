const { join } = require('path');
const { pathExists, readJson, writeJSON } = require('fs-extra');

function createCore({ cwd }, { setState, getState }) {
  async function hasFile(file) {
    return await pathExists(join(cwd, file));
  }
  async function getPackageProp(prop) {
    const pkgPath = join(cwd, 'package.json');
    return await readJson(pkgPath)[prop];
  }
  async function hasPackageProp(prop) {
    return (await getPackageProp(prop)) !== undefined;
  }
  async function setPackageProp(prop, value) {
    const pkgPath = join(cwd, 'package.json');
    const currentContents = await readJson(pkgPath);
    const nextContents = { ...currentContents, [prop]: value };
    await writeJSON(pkgPath, nextContents);
  }
  return {
    setState,
    getState,
    hasFile,
    getPackageProp,
    hasPackageProp,
    setPackageProp,
  };
}

module.exports = createCore;
