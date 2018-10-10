# spire

**spire** is an extensible CLI toolkit managment tool.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Motivation](#motivation)
- [Quick Start](#quick-start)
- [Customisation](#customisation)
  - [Configs](#configs)
  - [Plugins](#plugins)
  - [CLI Options](#cli-options)
- [References](#references)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation

Moving shared tools and their configuration to separate module reduces
maintenance costs and increases consistency across multiple projects. This
project aims to provide pluggable system for building tools like
[react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts),
[kcd-scripts](https://github.com/kentcdodds/kcd-scripts) or
[bolt](https://github.com/boltpkg/bolt) with ability to compose and reuse
individual features.

## Quick Start

1. Install `spire`:

```sh
# yarn
yarn add --dev spire

# npm
npm install --save-dev spire
```

2. Start using in your project:

```sh
# npx
npx spire --help

# yarn
yarn spire --help
```

## Customisation

### Configs

Config is a set of (customisable) predefined options and plugins. By default,
spire is shipped with [spire-config-default](../spire-config-default/readme.md).
To use preferred configuration, install it as dev dependency and reference it in
spire configuration (preferable in `package.json#spire`):

```sh
{
  "name": "acme-project",
  "spire": {
    "extends": "spire-config-acme",
    "plugins": [
      ["<rootDir>/spire-custom-plugin.js", {
        "answer": 42
      }]
    ]
  }
}
```

Configs can be referenced as modules or by absolute path. You can also use
`<rootDir>` placeholder to look configs relative to current project:

```json
{
  "spire": {
    "extends": "<rootDir>/local-spire-config.js"
  }
}
```

### Plugins

Each plugin added to your configuration can extend any aspect of your toolkit.
In general, there are 7 lifecycle methods to keep your setup organized:

```js
function customAcmePlugin(spire, options) {
  return {
    // Runs on `yarn` (or `npm install`)
    async postinstall(context) {},
    // Runs on each `git pull`
    async postmerge(context) {},
    // Runs on each `git commit`
    async precommit(context) {},
    // Runs before each `npx spire`
    // Use it to prepare arguments or config for your tools
    async setup(context) {},
    // Runs on each `npx spire`
    // This method also recevies `context.options` with parsed yargs options
    // Use it for main logic, e.g. to run cli tool
    async run(contextWithOptions) {},
    // Runs after each `npx spire`
    // Use it to clean up or validate stuff
    async teardown(contextWithOptions) {},
    // Runs before `yarn uninstall` (or `npm uninstall`)
    async preuninstall(context) {},
  };
}

module.exports = customAcmePlugin;
```

By default there's [3 system plugins](./lib/plugins/) to enable core
functionality. It's recommended to keep one plugin for one feature or tool.

Like config presets, plugins can be referenced as modules or by absolute path.
`<rootDir>` placeholder is also available to reference plugin relative to
current project.

### CLI Options

Each plugin is able to extend list of commands and their options. Below is a
list of common ones:

- `npx spire --help` Lists of available commands.
- `npx spire --version` Prints current version of `spire`.
- `npx spire <cmd>` Runs specific command defined by plugins.
- `npx spire <cmd> --debug` Outputs additional debug information.
- _(hidden)_ `npx spire hook <name>` Runs specific git or npm hook in plugins.
  Available hooks are `postinstall`, `preuninstall`, `precommit` and
  `postmerge`.

## References

This project is inspiered by great work of JavaScript open source community
(without particular order):

- [Kent C. Dodds: Tools without config 🛠📦](https://blog.kentcdodds.com/automation-without-config-412ab5e47229)
- [Dan Abramov: The Melting Pot of JavaScript](https://www.youtube.com/watch?v=nl30vWYKs9A)
- [Jamie Kyle: Tools 4 Tools 4 Tools](https://www.youtube.com/watch?v=itI5xGyvtho)
- [semantic-release](https://github.com/semantic-release/semantic-release)
- [react-scripts](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts)
- [bolt](https://github.com/boltpkg/bolt)

## License

MIT &copy; [ResearchGate](https://github.com/researchgate)
