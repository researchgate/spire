# spire-plugin-lint-staged

[Yarn](https://github.com/yarnpkg/yarn) plugin for
[Spire](https://github.com/researchgate/spire).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Hooks](#hooks)
- [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Hooks

- `preinstall` Ensures what `yarn` is used instead of `npm`.
- `postinstall` Runs
  [`yarn-deduplicate`](https://github.com/atlassian/yarn-deduplicate).

## Options

- Plugin `['spire-plugin-yarn', options]`
  - `deduplicateStrategy` \<string\> Deduplication strategy. Valid values:
    `fewer`, `highest`. Defaults to `highest`.
