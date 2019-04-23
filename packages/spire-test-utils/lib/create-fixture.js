const { tmpdir } = require('os');
const { join } = require('path');
const { outputFile, remove } = require('fs-extra');
const execa = require('execa');
const shortid = require('shortid');

async function createFixture(
  structure = {},
  { identifier = shortid.generate(), git = true } = {}
) {
  const cwd = join(tmpdir(), identifier);
  const files = Object.keys(structure);
  await Promise.all(
    files.map(file => outputFile(join(cwd, file), structure[file], 'utf8'))
  );
  if (git) await execa('git', ['init'], { cwd });
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
