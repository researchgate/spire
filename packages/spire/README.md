# 🗼 Spire

Extensible JavaScript toolbox management.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Motivation](#motivation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [Using a Custom Preset](#using-a-custom-preset)
  - [Using a Local Preset](#using-a-local-preset)
  - [Passing Options](#passing-options)
- [Guides](#guides)
  - [Writing a Config](#writing-a-config)
  - [Writing a Plugin](#writing-a-plugin)
  - [Migrating to Spire](#migrating-to-spire)
  - [Using without Git](#using-without-git)
  - [Using in monorepos](#using-in-monorepos)
- [API](#api)
  - [CLI](#cli)
  - [`spire`](#spire)
  - [`context`](#context)
- [References](#references)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation

**Problem:** Maintaining tools and configurations for linting, testing and
building your code is hard. The more projects you have, the more time it takes
to keep your setup consistent and up-to-date.

**Solution:** Spire is a pluggable CLI tool which allows you to abstract all of
your tools and configurations into reusable plugins and presets. Think of it as
“babel for infrastructure”.

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

3. Depending on your tech stack, you can start using Spire as zero-config tool.
   See [spire-config-default] for a list of default tools and
   [configuration section](#configuration) for how to customise it.

- _Using yarn? Consider installing [spire-plugin-yarn] for few power features._

- _Want to have automated release w/ changelog generation? Check out
  [spire-plugin-semantic-release] and [spire-plugin-lerna-release] for lerna
  monorepos._

## Configuration

Spire is based on config presets, which is the same concept for tools like
[Babel](https://babeljs.io/) and [ESLint](https://eslint.org/). Configs are a
set of predefined plugins and their options. Configs can also extend a chain of
other configs. By default, Spire is shipped with [spire-config-default].

### Using a Custom Preset

To use your preferred configuration, install it as dev dependency and reference
it by module name in [`extends` property](#writing-a-config). To extend multiple
configs, provide it as an array. You can also use individual plugins along with
configs with [`plugins` property](#writing-a-config).

<details open>
  <summary>via <code>package.json#spire</code> (recommended)</summary>

```json
{
  "name": "acme-project",
  "devDependencies": {
    "spire": "^3.0.0",
    "spire-config-acme": "^1.0.0"
  },
  "spire": {
    "extends": "spire-config-acme"
  }
}
```

</details>

<details>
  <summary>via <code>spire.config.js</code></summary>

```js
module.exports = {
  extends: 'spire-config-acme',
};
```

</details>

<details>
  <summary>via <code>.spirerc</code></summary>

```js
{
  "extends": "spire-config-acme",
}
```

</details>

### Using a Local Preset

_Note: It is recommended to enable Local Presets only for development._

You can reference a Local Preset or plugin using `<rootDir>` placeholder which
points to the current project directory:

```json
{
  "spire": {
    "extends": "<rootDir>/spire-config.js",
    "plugins": ["<rootDir>/spire-plugin.js"]
  }
}
```

### Passing Options

If the config preset or plugin you're using supports customisation, you can pass
options to it:

```json
{
  "spire": {
    "extends": [["spire-config-acme", { "fictional": false }]],
    "plugins": [["spire-plugin-acme", { "company": true }]]
  }
}
```

## Guides

### Writing a Config

A Config is a module which exports a function returning an object.

- `config` \<[function]([Object], [Object])\>
  - `spire` \<[Object]\> Spire [API object](#spire).
  - `options` \<[Object]\> User-provided config options.
- returns: \<[Object]\>
  - `extends` \<[string]|\<[Array]\<[string]\>\>\> Config or an array of config
    presets to extend.
  - `plugins` \<[Array]\<[string]\>\> Array of plugins to include.

Example:

```js
module.exports = (spire, options) => {
  return {
    extends: ['spire-config-first', 'spire-config-second'],
    plugins: ['spire-plugin'],
  };
};
```

You can dynamically change the behaviour of your preset based on `options` or
`spire` APIs, but it's recommended to keep it explicit. Check
[spire-config-default](https://github.com/researchgate/spire/blob/master/packages/spire-config-default/index.js)
for a reference.

### Writing a Plugin

A Plugin is a key component of Spire. After it resolves the config, Spire
accumulates all plugins in chronological order and runs them. A Plugin is a
function returning an object:

_Note: It is recommended to keep plugins scoped to a single feature or tool._

- `plugin` \<[function]([Object], [Object])\>
  - `spire` \<[Object]\> Spire [API object](#spire).
  - `options` \<[Object]\> User-provided plugin options.
- returns: \<[Object]\>
  - `name` \<[string]\> Name of the plugin (recommended).
  - `command` \<[string]\> Optional name of command. Leaving it empty will
    ignore `run` hook completly.
  - `description` \<[string]\> Optional human-readable command description.
  - `preinstall` \<[function]\([Context]\): [Promise]\> Executed before
    `yarn install` or `npm install`
  - `postinstall` \<[function]\([Context]\): [Promise]\> Executed after
    `yarn install` or `npm install`.
  - `postmerge` \<[function]\([Context]\): [Promise]\> Executed on `git pull`.
  - `precommit` \<[function]\([Context]\): [Promise]\> Executed on `git commit`.
  - `setup` \<[function]\([Context]\): [Promise]\> Executed before `run` hook.
    Use it to prepare arguments or config for your tools. If it fails, Spire
    stops futher hooks from being executed.
  - `run` \<[function]\([Context]\): [Promise]\> Executed as the main logic of
    the plugin. Use this hook to run the CLI tool or process long-running task.
  - `teardown` \<[function]\([Context]\): [Promise]\> Executed after `run` hook,
    even if it has failed. Use this hook to cleanup locally or to collect some
    stats.
  - `preuninstall` \<[function]\([Context]\): [Promise]\> Executed before
    `yarn uninstall` or `npm uninstall`. Run it to cleanup external data.

Example:

```js
module.exports = (spire, options) => {
  return {
    name: 'my-awesome-tool',
    command: 'my-tool',
    description: 'run my awesome tool',
    async run({ logger }) {
      logger.log('Hi from my awesome tool!');
    },
  };
};
```

Check [spire-plugin-clean], [spire-plugin-doctoc] and [spire-plugin-eslint] for
more plugin examples.

### Migrating to Spire

**Identify your tools:** To get started, gather a list of shared tools in your
existing projects. This will help to identify which plugins you'll need.

**Pick preset or plugin:** Check if there's already a default or community
plugin for that.
[Search for `spire-plugin-*`](https://www.npmjs.com/search?q=spire-plugin-) on
npm for individual tools and
[`spire-config-*`](https://www.npmjs.com/search?q=spire-config-) for specific
ecosystems and tech stacks. In case if there's no suitable option for your,
check on how to [write a custom plugin](#writing-a-plugin).

**Make your own preset**: If you find that an existing or default preset works
for you, skip this step. If not, create a new module with a name matching
`spire-config-*`. It can be specific for your personal projects, your company or
a tech stack. Check [writing a config](#writing-a-config) for instructions on
how to do this.

**Migrate your projects**: Once you've got a preset ready, go through your
projects and [setup Spire](#quick-start) with it. Make sure to delete the
dependencies it replaces. At this point you're done!

### Using without Git

You do not need to have git installed to run spire itself. Be aware though that
certain plugins might need to have git installed to work. For example the
semantic-release and lerna-release plugin obviously need git because they create
tags and commits.

### Using in monorepos

It is recommended to install Spire on the root level of a monorepo and run all
commands from there. The main motivation behind this is performance and
consistency reasons. You can still though run commands in an indivudual package.
Below is an example of how to run `spire lint` in a specific monorepo package:

- With [yarn workspaces]:
  ```sh
  yarn workspace <pkg-name> spire lint
  ```
- With [lerna]:
  ```sh
  npx lerna --scope <pkg-name> exec spire lint
  ```

## API

### CLI

Each plugin can extend a list of available commands and their options. The list
below only includes basic commands.

- `npx spire --help` Prints the list of available commands.
- `npx spire --version` Prints the current version of Spire.
- `npx spire <cmd>` Runs a specific command defined by plugins.
- `npx spire --debug <cmd>` Outputs additional debug information.
- _(hidden)_ `npx spire hook <name>` Runs specific git or npm plugin hooks.
  Available hooks are `postinstall`, `preuninstall`, `precommit` and
  `postmerge`. Use this to test or debug your plugins.

### `spire`

Spire is an object which is passed as the first argument to both configs and
plugins.

- `spire`
  - `setState` \<[function]\([Object]|[function]\)\> Sets state by merging it
    with previous one (shallow).
    - `state` \<[Object]|[function]\> New state as an object or a function which
      recevies the previous state and returns an object. Usefull to avoid
      `getState()` calls.
  - `getState` \<[function]\(\): [Object]\> Returns current state.
  - `hasFile` \<[function]\([string]\): [Promise]\<[boolean]\>\> Checks if
    current projects contains specific file.
  - `hasPackageProp` \<[function]\([string]\): [Promise]\<[boolean]\>\> Check if
    current project's `package.json` contains specific prop.

### `context`

Context is an object which is passed as the first argument to plugin hooks. It's
designed to be read-only. If you want to pass some data futher, consider using
[`spire.setState` instead](#spire).

- `context`
  - `argv` \<[Array]\<[string]\>\> Array of arguments Spire was called with.
    Defaults to `process.argv.slice(2)`.
  - `cli` \<[Object]\> Instance of [yargs](http://yargs.js.org/) for adding
    custom commands.
  - `cwd` \<[string]\> Directory Spire is executed in. Defaults to
    `process.cwd()`.
  - `env` \<[Object]\> Set of environment variables. Defaults to `process.env`.
  - `logger` \<[Object]\> Instance of
    [Signale](https://github.com/klauscfhq/signale). Use `logger.debug()` to
    print debug info which is only shown with `--debug` flag.
  - `config` \<[Object]\> Parsed and normalised [config](#writing-a-config).
  - `options` \<[Object]\> Parsed yargs options. Available only after `setup`
    hook.

## References

This project is inspired by the great work of JavaScript open source community
(without particular order):

- [Kent C. Dodds: Tools without config 🛠📦](https://blog.kentcdodds.com/automation-without-config-412ab5e47229)
- [Dan Abramov: The Melting Pot of JavaScript](https://www.youtube.com/watch?v=nl30vWYKs9A)
- [Jamie Kyle: Tools 4 Tools 4 Tools](https://www.youtube.com/watch?v=itI5xGyvtho)
- [semantic-release](https://github.com/semantic-release/semantic-release)
- [react-scripts](https://github.com/facebook/create-react-app/tree/next/packages/react-scripts)
- [kcd-scripts](https://github.com/kentcdodds/kcd-scripts)
- [bolt](https://github.com/boltpkg/bolt)

## License

MIT &copy; [ResearchGate](https://github.com/researchgate)

[context]: #context
[spire-config-default]:
  https://github.com/researchgate/spire/blob/master/packages/spire-config-default
[spire-plugin-yarn]:
  https://github.com/researchgate/spire/blob/master/packages/spire-plugin-yarn
[spire-plugin-clean]:
  https://github.com/researchgate/spire/blob/master/packages/spire-plugin-clean
[spire-plugin-doctoc]:
  https://github.com/researchgate/spire/blob/master/packages/spire-plugin-doctoc
[spire-plugin-eslint]:
  https://github.com/researchgate/spire/blob/master/packages/spire-plugin-eslint
[spire-plugin-semantic-release]:
  https://github.com/researchgate/spire/blob/master/packages/spire-plugin-semantic-release
[spire-plugin-lerna-release]:
  https://github.com/researchgate/spire/blob/master/packages/spire-plugin-lerna-release
[boolean]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[string]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[array]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[object]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[function]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
[promise]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[symbol]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[create-react-app]: https://github.com/facebook/create-react-app
[yarn workspaces]: https://yarnpkg.com/lang/en/docs/workspaces/
[lerna]: https://github.com/lerna/lerna
