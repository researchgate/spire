# spire-plugin-semantic-release

[semantic-release] plugin for [Spire](../spire/README.md).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Quick start](#quick-start)
- [Hooks](#hooks)
- [Options](#options)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick start

1. Install `spire-plugin-semantic-release`

```sh
yarn add --dev spire-plugin-semantic-release
```

2. Add `spire-plugin-semantic-release` to list of plugins

```json
{
  "spire": {
    "plugins": ["spire-plugin-semantic-release"]
  }
}
```

## Hooks

- `setup` Adds `release` command and prepares semantic-release arguments.
- `run` Runs semantic-release.

## Options

- Plugin `['spire-plugin-semantic-release', options]`

  - `command` \<[string]\> Command to run semantic-release on. Defaults to
    `release`.
  - `config` \<[string]\> Default [semantic-release] configuration. Defaults to
    [`./config.js`](./config.js).
  - `allowCustomConfig` \<[boolean]\> Whether to allow user-provided config. If
    this option is `false` and there's custom semantic-release config found it
    will throw an error. Defaults to `true`.
  - `changelogName` \<[string]\> Case-sensitive changelog name. Defaults to
    `changelog.md`.
  - `gitAuthorName` \<[string]\> Git author and commiter name. Defaults to
    `undefined`, which falls back to default value of [semantic-release].
  - `gitAuthorEmail` \<[string]\> Git author and commiter email. Defaults to
    `undefined`, which falls back to default value of [semantic-release].

- CLI `npx spire release [args]`
  - Passes all arguments as-is to semantic-release.

## License

MIT &copy; [ResearchGate](https://github.com/researchgate)

[semantic-release]: https://github.com/semantic-release/semantic-release
[boolean]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[string]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[array]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
