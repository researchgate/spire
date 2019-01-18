# spire-plugin-lint-staged

[lint-staged](https://github.com/okonet/lint-staged) plugin for
[Spire](https://github.com/researchgate/spire).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Hooks](#hooks)
- [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Hooks

- `setup` Prepares lint-staged arguments.
- `precommit` Runs lint-staged.

## Options

- Plugin `['spire-plugin-lint-staged', options]`

  - `lintStagedConfig` \<string\> lint-staged configuration. Defaults to
    [`./config.js`](./config.js).
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom lint-staged config found it will
    throw an error. Defaults to `true`.
