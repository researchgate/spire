const { join } = require('path');
const { outputFile, remove } = require('fs-extra');

async function createDirFixture(dir, structure) {
  const files = Object.keys(structure);
  await Promise.all(
    files.map(file => outputFile(join(dir, file), structure[file], 'utf8'))
  );
  return async function clean() {
    return await Promise.all(files.map(file => remove(join(dir, file))));
  };
}

module.exports = createDirFixture;
