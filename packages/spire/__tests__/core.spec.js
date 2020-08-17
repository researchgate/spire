const { createFixture } = require('spire-test-utils');
const { readFile } = require('fs-extra');
const { join } = require('path');
const createCore = require('../lib/create-core');

const getCore = (cwd) => {
  return createCore({ cwd: cwd }, { setState: () => {}, getState: () => {} });
};

describe('spire', () => {
  test.each(['  ', '    ', '   ', '\t'])(
    'detects correct indent for "%s"',
    async (indent) => {
      const fixture = await createFixture({
        'package.json': `{\n${indent}"name": "spire-test-hooks"\n}`,
      });
      const { setPackageProp } = getCore(fixture.cwd);
      await setPackageProp('test', '123');
      expect(await readFile(join(fixture.cwd, 'package.json'), 'UTF-8')).toBe(
        `{\n${indent}"name": "spire-test-hooks",\n${indent}"test": "123"\n}\n`
      );
      await fixture.clean();
    }
  );
});
