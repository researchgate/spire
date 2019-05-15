# spire-plugin-clean

[Spire](https://github.com/researchgate/spire) plugin to remove files matching
`.gitignore`. Unstaged files are kept by default

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Hooks](#hooks)
- [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Hooks

- `setup` Adds `clean` command.
- `run` Runs `git clean` command.

## Options

- Plugin `['spire-plugin-clean', options]`

  - `command` \<string\> Command to run on. Defaults to `clean`.
  - `keep` \<Array\<string\>\> Glob of files to keep even if matched. Defaults
    to `['node_modules/', '.vscode/', '.atom/', '.idea/', '.sublime-project/']`.

- CLI `npx spire clean [args]`
  - Passes all arguments as-is to `git clean`
  - _Tip:_ use `npx spire clean --dry-run` to check which files would be
    removed.
