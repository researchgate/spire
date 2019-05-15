# spire-plugin-eslint

[ESLint](https://eslint.org/) plugin for
[Spire](https://github.com/researchgate/spire).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Hooks](#hooks)
- [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Hooks

- `setup` Adds `lint` and prepares eslint arguments.
- `precommit` Adds eslint linter.
- `run` Runs eslint.

## Options

- Plugin `['spire-plugin-eslint', options]`

  - `command` \<string\> Command name to run eslint on. Defaults to `lint`.
  - `eslintConfig` \<string\> Default [eslint] configuration. Defaults to
    [`./config.js`](./config.js).
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom eslint config found it will throw
    an error. Defaults to `true`.
  - `eslintIgnore` \<string\> Path to default `.eslintignore`. Defaults to
    `.gitignore`.
  - `allowCustomIgnore` \<boolean\> Whether to allow user-provided
    `.eslintignore`. If this option is `false` and there's custom ignore file
    found it will throw an error. Defaults to `true`.
  - `glob` \<string\> Linter glob to run on precommit. Defaults to `*.js`.

- CLI `npx spire lint [args]`
  - Passes all arguments as-is to eslint.
