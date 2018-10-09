# spire-config-default

Default config preset for [spire].

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Quick Start](#quick-start)
- [Commands](#commands)
  - [`npx spire clean`](#npx-spire-clean)
  - [`npx spire format`](#npx-spire-format)
  - [`npx spire lint`](#npx-spire-lint)
  - [`npx spire test`](#npx-spire-test)
  - [`npx spire release`](#npx-spire-release)
- [Preset](#preset)
- [Plugins](#plugins)
  - [`spire-config-default/verify`](#spire-config-defaultverify)
  - [`spire-config-default/clean`](#spire-config-defaultclean)
  - [`spire-config-default/doctoc`](#spire-config-defaultdoctoc)
  - [`spire-config-default/prettier`](#spire-config-defaultprettier)
  - [`spire-config-default/eslint`](#spire-config-defaulteslint)
  - [`spire-config-default/jest`](#spire-config-defaultjest)
  - [`spire-config-default/lint-staged`](#spire-config-defaultlint-staged)
  - [`spire-config-default/semantic-release`](#spire-config-defaultsemantic-release)
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

### `npx spire format`

Runs [prettier]. Passes custom arguments after `--`, e.g.
`npx spire format -- --list-different`.

### `npx spire lint`

Runs [eslint]. Passes custom arguments after `--`, e.g.
`npx spire lint -- --fix-dry-run`.

### `npx spire test`

Runs [jest]. Passes custom arguments after `--`, e.g.
`npx spire test -- --findRelatedTests foo.js`.

### `npx spire release`

Runs [semantic-release]. Passes custom arguments after `--`, e.g.
`npx spire release -- --no-ci`.

## Preset

This preset allows to override options or completly disable specific plugins via
config options:

```json
{
  "spire": {
    "extends": [
      [
        "spire-config-default",
        {
          "jest": {
            "jestConfig": "jest-preset-acme"
          },
          "doctoc": false
        }
      ]
    ]
  }
}
```

Each key maps to [plugin](#plugins) name without scope.

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
  - `doctocArgs` \<Array\<string\>\> Default arguments for [doctoc]. Defaults to
    `['--maxlevel 3', '--notitle']`.
  - `linterGlob` \<string\> Glob pattern to generate ToC for. Defaults to
    `{readme,contributing}.md`.

### `spire-config-default/prettier`

- Hooks
  - `setup` Adds [`format` command](#npx-spire-format) and prepares [prettier]
    arguments.
  - `precommit` Adds [prettier] linter.
  - `run` Runs [`format` command](#npx-spire-format).
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
  - `setup` Adds [`lint` command](#npx-spire-lint) and prepares [eslint]
    arguments.
  - `precommit` Adds [eslint] linter.
  - `run` Runs [`lint` command](#npx-spire-lint).
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
  - `defaultGlob` \<string\> Default glob of files to lint. Defaults to `.`.
  - `linterGlob` \<string\> Linter glob to run on precommit. Defaults to `*.js`.

### `spire-config-default/jest`

- Hooks
  - `setup` Adds [`test` command](#npx-spire-test) and prepares [jest]
    arguments.
  - `precommit` Adds [jest] linter.
  - `run` Runs [`test` command](#npx-spire-test-[args]).
- Options
  - `jestConfig` \<string\> Default [jest] configuration. Defaults to
    [`spire-config-default/config/jest`](./config/jest.js)
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom jest config found it will throw an
    error. Defaults to `true`.
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

### `spire-config-default/semantic-release`

- Hooks
  - `setup` Adds [`release` command](#npx-spire-release) and prepares
    [semantic-release] arguments.
  - `run` Runs [`release` command](#npx-spire-release).
- Options
  - `semanticReleaseConfig` \<string\> Default [semantic-release] configuration.
    Defaults to
    [`spire-config-default/config/semantic-release`](./config/semantic-release.js).
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom semantic-release config found it
    will throw an error. Defaults to `true`.
  - `changelogName` \<string\> Case-sensitive changelog name. Defaults to
    `changelog.md`.
  - `gitAuthorName` \<string\> Git author and commiter name. Defaults to
    `undefined`, which falls back to default value of [semantic-release].
  - `gitAuthorEmail` \<string\> Git author and commiter email. Defaults to
    `undefined`, which falls back to default value of [semantic-release].

## License

MIT &copy; [ResearchGate](https://github.com/researchgate)

[spire]: ../spire/readme.md
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/
[doctoc]: https://github.com/thlorenz/doctoc
[jest]: https://jestjs.io/
[lint-staged]: https://github.com/okonet/lint-staged
[semantic-release]: https://github.com/semantic-release/semantic-release
