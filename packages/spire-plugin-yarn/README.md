# spire-plugin-lint-staged

[Yarn](https://github.com/yarnpkg/yarn) plugin for
[Spire](https://github.com/researchgate/spire).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Quick start](#quick-start)
- [Hooks](#hooks)
- [Options](#options)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick start

1. Install `spire-plugin-yarn`

```sh
yarn add --dev spire-plugin-yarn
```

2. Add `spire-plugin-yarn` to list of plugins

```json
{
  "spire": {
    "plugins": ["spire-plugin-yarn"]
  }
}
```

## Hooks

- `preinstall` Ensures what `yarn` is used instead of `npm`.
- `postinstall` Runs [yarn-deduplicate].

## Options

- Plugin `['spire-plugin-yarn', options]`
  - `deduplicateStrategy` \<[string]\> Deduplication strategy. Valid values:
    `fewer`, `highest`. Defaults to `highest`.

## License

MIT &copy; [ResearchGate](https://github.com/researchgate)

[yarn-deduplicate]: https://github.com/atlassian/yarn-deduplicate
[string]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
