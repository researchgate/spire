# spire-plugin-jest

[Jest](https://jestjs.io/) plugin for
[Spire](https://github.com/researchgate/spire).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Hooks](#hooks)
- [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Hooks

- `setup` Adds `test` command and prepares jest arguments.
- `precommit` Adds jest linter.
- `run` Runs jest tests.

## Options

- Plugin `['spire-plugin-jest', options]`

  - `command` \<string\> Command to run jest on. Defaults to `test`.
  - `jestConfig` \<string\> Default [jest] configuration. Defaults to
    [`./jest-preset.js`](./jest-preset.js)
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom jest config found it will throw an
    error. Defaults to `true`.
  - `glob` \<string\> Linter glob to run on precommit. Defaults to `*.js`.

- CLI `npx spire test`
  - Passes all arguments after `--` as-is to jest.
