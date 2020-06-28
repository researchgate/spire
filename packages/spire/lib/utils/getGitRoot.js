const { resolve, dirname } = require('path');
const { pathExists } = require('fs-extra');

async function getGitRoot(dir) {
  var gitFolder = resolve(dir, '.git');
  const exists = await pathExists(gitFolder);
  if (exists) {
    return dir;
  }
  const newDir = dirname(dir);
  // Reached top
  if (dir === newDir) {
    return null;
  }

  return getGitRoot(newDir);
}

module.exports = getGitRoot;
