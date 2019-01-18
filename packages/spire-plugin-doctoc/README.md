# spire-plugin-doctoc

[doctoc](https://github.com/thlorenz/doctoc) plugin for
[Spire](https://github.com/researchgate/spire) to generate ToC for specific
markdown files.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Hooks](#hooks)
- [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Hooks

- `setup` Prepares doctoc arguments.
- `precommit` Adds markdown linter.

## Options

- Plugin `['spire-plugin-doctoc', options]`
  - `args` \<Array\<string\>\> List of arguments to pass to doctoc. Defaults to
    `['--maxlevel 3', '--notitle']`.
  - `glob` \<string\> Case-insensitive glob of files to generate ToC for.
    Defaults `{readme,contributing}.md`.
