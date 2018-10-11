const { tmpdir } = require('os');
const { join } = require('path');
const { outputFile, remove } = require('fs-extra');
const execa = require('execa');

async function createFixture(
  structure = {},
  identifier = (+new Date()).toString(36)
) {
  const cwd = join(tmpdir(), identifier);
  const files = Object.keys(structure);
  await Promise.all(
    files.map(file => outputFile(join(cwd, file), structure[file], 'utf8'))
  );
  await execa('git', ['init'], { cwd });
  return {
    get cwd() {
      return cwd;
    },
    async clean() {
      return await remove(cwd);
    },
    async run(tool, args, options = {}) {
      return await execa(tool, args, { cwd, ...options });
    },
  };
}

module.exports = createFixture;
