const { join } = require('path');
const { pathExists, readJson, writeJSON, readFile } = require('fs-extra');
const detectIndent = require('detect-indent');

function createCore({ cwd }, { setState, getState }) {
  async function hasFile(file) {
    return pathExists(join(cwd, file));
  }
  async function getPackageProp(prop) {
    const pkgPath = join(cwd, 'package.json');
    return (await readJson(pkgPath))[prop];
  }
  async function hasPackageProp(prop) {
    return (await getPackageProp(prop)) !== undefined;
  }
  async function setPackageProp(prop, value) {
    const pkgPath = join(cwd, 'package.json');
    const fileContents = await readFile(pkgPath, 'UTF-8');
    const spaces = detectIndent(fileContents).indent;
    const currentContents = JSON.parse(fileContents);
    const nextContents = { ...currentContents, [prop]: value };
    await writeJSON(pkgPath, nextContents, { spaces });
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
