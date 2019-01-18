# spire-plugin-clean

[Spire](https://github.com/researchgate/spire) plugin to remove files matching
`.gitignore`.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Hooks](#hooks)
- [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Hooks

- `setup` Adds `clean` command.
- `run` Removes files on `clean` command.

## Options

- Plugin `['spire-plugin-clean', options]`

  - `command` \<string\> Command to run on. Defaults to `clean`.
  - `keeplist` \<Array\<string\>\> Glob of files to keep even if matched.
    Defaults to
    `['node_modules/', '.vscode/', '.atom/', '.idea/', '.sublime-project/']`.

- CLI `npx spire clean`
  - `--keeplist` \<Array\> Array of patterns to keep even if matched. Defaults
    to `keeplist` plugin's option.
  - `--ignore-keeplist` \<boolean\> Ignore keeplist to remove all matching
    files. Defaults to `false`
  - `--dry-run` \<boolean\> List matched files without removing them. Defaults
    to `false`.
