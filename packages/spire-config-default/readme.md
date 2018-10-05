# spire-config-default

Default config preset for [spire].

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Quick Start](#quick-start)
- [Commands](#commands)
  - [`npx spire clean`](#npx-spire-clean)
  - [`npx spire format [glob]`](#npx-spire-format-glob)
  - [`npx spire lint [glob]`](#npx-spire-lint-glob)
  - [`npx spire test [regex]`](#npx-spire-test-regex)
- [Plugins](#plugins)
  - [`spire-config-default/verify`](#spire-config-defaultverify)
  - [`spire-config-default/clean`](#spire-config-defaultclean)
  - [`spire-config-default/doctoc`](#spire-config-defaultdoctoc)
  - [`spire-config-default/prettier`](#spire-config-defaultprettier)
  - [`spire-config-default/eslint`](#spire-config-defaulteslint)
  - [`spire-config-default/jest`](#spire-config-defaultjest)
  - [`spire-config-default/lint-staged`](#spire-config-defaultlint-staged)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick Start

`spire-config-default` is shipped by default with [spire]. If you would like to
extend or reuse specific plugins, refer to [plugins section](#plugins).

## Commands

### `npx spire clean`

Cleans files matching `.gitignore`.

- `--keeplist` \<Array\> Array of patterns to keep even if matched. Defaults to
  `keeplist` plugin's option.
- `--ignore-keeplist` \<boolean\> Ignore keeplist to remove all matching files.
  Defaults to `false`
- `--dry-run` \<boolean\> List matched files without removing them. Defaults to
  `false`.

### `npx spire format [glob]`

Runs [prettier] on specified files.

- `[glob]` \<string\> Glob of files to format. Defaults to `defaultGlob`
  plugin's option.

### `npx spire lint [glob]`

Runs [eslint] on specified files.

- `[glob]` \<string\> Glob of files to lint. Defaults to `defaultGlob` plugin's
  option.

### `npx spire test [regex]`

Runs [jest] on specified regex.

- `[regex]` \<string\> Regex of test files. Defaults to `defaultRegex` plugin's
  option.

## Plugins

### `spire-config-default/verify`

- Hooks
  - `setup` Checks if project is a Git repository and sets `root` state property
    with absolute git root path.

### `spire-config-default/clean`

- Hooks
  - `setup` Adds [`clean` command](#npx-spire-clean).
  - `run` Runs [`clean` command](#npx-spire-clean).
- Options
  - `keeplist` \<Array\<string\>\> Default globs to keep. Defaults to
    `['node_modules/', '.vscode/', '.atom/', '.idea/', '.sublime-project/']`.

### `spire-config-default/doctoc`

- Hooks
  - `setup` Prepares [doctoc] arguments.
  - `precommit` Adds [doctoc] linter.
- Options
  - `linterGlob` \<string\> Glob pattern to generate ToC for. Defaults to
    `{readme,contributing}.md`.

### `spire-config-default/prettier`

- Hooks
  - `setup` Adds [`format` command](#npx-spire-format-glob) and prepares
    [prettier] arguments.
  - `precommit` Adds [prettier] linter.
  - `run` Runs [`format` command](#npx-spire-format-glob).
- Options
  - `prettierConfig` \<string\> Path to default [prettier] configuration.
    Defaults to [`spire-config-default/config/prettier`](./config/prettier.js).
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom prettier config found it will
    throw an error. Defaults to `true`.
  - `prettierIgnore` \<string\> Path to default `.prettierignore`. Defaults to
    `.gitignore`
  - `allowCustomIgnore` \<boolean\> Whether to allow user-provided
    `.prettierignore`. If this option is `false` and there's custom ignore file
    found it will throw an error. Defaults to `true`.
  - `defaultGlob` \<string\> Default glob of files to write. Defaults to
    `**/*.js`.
  - `linterGlobs` \<Array\<string\>\> Linter globs to run on precommit. Defaults
    to `['*.js', '*.json', '*.md']`.

### `spire-config-default/eslint`

- Hooks
  - `setup` Adds [`lint` command](#npx-spire-lint-glob) and prepares [eslint]
    arguments.
  - `precommit` Adds [eslint] linter.
  - `run` Runs [`lint` command](#npx-spire-lint-glob).
- Options
  - `eslintConfig` \<string\> Default [eslint] configuration. Defaults to
    [`spire-config-default/config/eslint`](./config/eslint.js).
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom eslint config found it will throw
    an error. Defaults to `true`.
  - `eslintIgnore` \<string\> Path to default `.eslintignore`. Defaults to
    `.gitignore`.
  - `allowCustomIgnore` \<boolean\> Whether to allow user-provided
    `.eslintignore`. If this option is `false` and there's custom ignore file
    found it will throw an error. Defaults to `true`.
  - `allowCustomArgs` \<boolean\> Whether to allow custom arguments provided to
    [`lint command`](#npx-spire-lint-glob).
  - `defaultGlob` \<string\> Default glob of files to lint. Defaults to `.`.
  - `linterGlob` \<string\> Linter glob to run on precommit. Defaults to `*.js`.

### `spire-config-default/jest`

- Hooks
  - `setup` Adds [`test` command](#npx-spire-test-regex) and prepares [jest]
    arguments.
  - `precommit` Adds [jest] linter.
  - `run` Runs [`test` command](#npx-spire-test-regex).
- Options
  - `jestConfig` \<string\> Default [jest] configuration. Defaults to
    [`spire-config-default/config/jest`](./config/jest.js)
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom jest config found it will throw an
    error. Defaults to `true`.
  - `defaultTestRegex` \<string\> Default test regex. Defaults to empty string.
  - `linterGlob` \<string\> Linter glob to run on precommit. Defaults to `*.js`.

### `spire-config-default/lint-staged`

- Hooks
  - `setup` Prepares [lint-staged] arguments.
  - `precommit` Runs [lint-staged].
- Options
  - `lintStagedConfig` \<string\> Default [lint-staged] configuration. Defaults
    to [`spire-config-default/config/lint-staged`](./config/lint-staged.js).
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom lint-staged config found it will
    throw an error. Defaults to `true`.

## License

MIT &copy; [ResearchGate](https://github.com/researchgate)

[spire]: ../spire/readme.md
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/
[doctoc]: https://github.com/thlorenz/doctoc
[jest]: https://jestjs.io/
[lint-staged]: https://github.com/okonet/lint-staged
