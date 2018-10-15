const { createFixture } = require('@rg/spire-test-utils');

const configWithJestPlugin = JSON.stringify({
  name: 'spire-config-default-test-jest',
  spire: {
    plugins: [
      '@rg/spire-config-default/jest',
      '@rg/spire-config-default/lint-staged',
    ],
  },
});

describe('spire-config-default/jest', () => {
  it('adds test command', async () => {
    const fixture = await createFixture({
      'package.json': configWithJestPlugin,
    });
    await expect(fixture.run('spire', ['--help'])).resolves.toMatchObject({
      stdout: /Commands:\s+spire test/,
    });
    await fixture.clean();
  });

  it('runs jest and adds linter', async () => {
    const fixture = await createFixture({
      'package.json': configWithJestPlugin,
      'foo.js': 'module.exports = (a, b) => a + b;',
      'foo.spec.js': `
const foo = require('./foo');

describe('foo', () => {
  it('works', () => {
    expect(foo(1, 2)).toBe(3);
  });
});
      `,
    });
    await fixture.run('git', ['add', 'foo.js']);
    await expect(
      fixture.run('spire', ['hook', 'precommit', '--debug'])
    ).resolves.toMatchObject({
      stdout: /Running tasks for \*\.js \[started\]\s+jest/,
    });
    await fixture.clean();
  });

  it('passes custom arguments to jest', async () => {
    const fixture = await createFixture({
      'package.json': configWithJestPlugin,
    });
    await expect(
      fixture.run('spire', ['test', '--', '--version'])
    ).resolves.toMatchObject({
      stdout: /v\d\.\d\.\d/,
    });
    await fixture.clean();
  });
});
