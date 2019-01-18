# spire-plugin-semantic-release

[semantic-release](https://github.com/semantic-release/semantic-release) plugin
for [Spire](../spire/README.md).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Hooks](#hooks)
- [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Hooks

- `setup` Adds `release` command and prepares semantic-release arguments.
- `run` Runs semantic-release.

## Options

- Plugin `['spire-plugin-semantic-release', options]`

  - `command` \<string\> Command to run semantic-release on. Defaults to
    `release`.
  - `semanticReleaseConfig` \<string\> Default [semantic-release] configuration.
    Defaults to [`./config.js`](./config.js).
  - `allowCustomConfig` \<boolean\> Whether to allow user-provided config. If
    this option is `false` and there's custom semantic-release config found it
    will throw an error. Defaults to `true`.
  - `changelogName` \<string\> Case-sensitive changelog name. Defaults to
    `changelog.md`.
  - `gitAuthorName` \<string\> Git author and commiter name. Defaults to
    `undefined`, which falls back to default value of [semantic-release].
  - `gitAuthorEmail` \<string\> Git author and commiter email. Defaults to
    `undefined`, which falls back to default value of [semantic-release].

- CLI `npx spire release`
  - Passes all arguments after `--` as-is to semantic-release.
