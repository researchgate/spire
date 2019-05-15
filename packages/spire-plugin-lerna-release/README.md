# spire-plugin-lerna-release

[lerna publish](https://github.com/lerna/lerna/tree/master/commands/publish)
plugin for [Spire](../spire/README.md).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Quick start](#quick-start)
- [Hooks](#hooks)
- [Options](#options)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick start

1. Install `spire-plugin-lerna-release`

```sh
yarn add --dev spire-plugin-lerna-release
```

2. Add `spire-plugin-lerna-release` to list of plugins

```json
{
  "spire": {
    "plugins": ["spire-plugin-lerna-release"]
  }
}
```

## Hooks

- `setup` Adds `release` command and prepares lerna arguments.
- `run` Runs `lerna publish`.

## Options

- Plugin `['spire-plugin-lerna-release', options]`

  - `command` \<[string]\> Command to run semantic-release on. Defaults to
    `release`.
  - `gitAuthorName` \<[string]\> Git author and commiter name. Defaults to
    `undefined`, which falls back to default value of [lerna].
  - `gitAuthorEmail` \<[string]\> Git author and commiter email. Defaults to
    `undefined`, which falls back to default value of [lerna].
  - `allowBranch` \<[string]\> Allowed branch to be released. Defaults to
    `master`.
  - `githubRelease` \<[boolean]\> Whether to create a GitHub release or not.
  - `extraArgs` \<[Array]\<[string]\>\> Array of extra argumnets to pass to
    `lerna publish`. Defaults to `[]`.

- CLI `npx spire release [args]`
  - Passes all arguments as-is to lerna.

## License

MIT &copy; [ResearchGate](https://github.com/researchgate)

[lerna]: https://github.com/lerna/lerna
[boolean]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[string]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[array]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
