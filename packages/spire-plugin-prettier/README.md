# spire-plugin-prettier

[Prettier](https://prettier.io/) plugin for
[Spire](https://github.com/researchgate/spire).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Hooks](#hooks)
- [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Hooks

- `setup` Adds `format` command and prepares prettier arguments.
- `precommit` Adds prettier linter.
- `run` Runs prettier.

## Options

- Plugin `['spire-plugin-prettier', options']`

  - `command` \<string\> Command to run prettier on. Defaults to `format`.
  - `prettierConfig` \<string\> Path to default [prettier] configuration.
    Defaults to [`./config.js`](./config.js).
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom prettier config found it will
    throw an error. Defaults to `true`.
  - `autosetPrettierConfig` \<boolean\> Whether to automatically set Prettier
    config in `package.json` on install or not. Defaults to `true`. _Note_: this
    is essential step for eslint-plugin-prettier and IDE integrations. You can
    also use `prettier.config.js` to re-export & modify target config, although
    not recommended. Prefer
    [`prettier` prop](https://prettier.io/docs/en/configuration.html#sharing-configurations)
    when possible.
  - `prettierIgnore` \<string\> Path to default `.prettierignore`. Defaults to
    `.gitignore`
  - `allowCustomIgnore` \<boolean\> Whether to allow user-provided
    `.prettierignore`. If this option is `false` and there's custom ignore file
    found it will throw an error. Defaults to `true`.
  - `glob` \<string\> Default glob of files to write. Defaults to
    `**/*.+(js|json|less|css|ts|tsx|md)`.

- CLI `npx spire format [args]`
  - Passes all arguments as-is to jest.
