# spire-config-default

Default config preset for [Spire](https://github.com/researchgate/spire).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Quick Start](#quick-start)
- [Plugins](#plugins)
- [Options](#options)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Quick Start

_Note: this module is shipped by default with Spire. Only install it directly if
you want to build your preset on top of it._

1. Install `spire-config-default`:

```sh
# yarn
yarn add spire-config-default

# npm
npm install --save spire-config-default
```

2. Extend it in your config or preset:

```js
module.exports = () => ({
  extends: [['spire-config-default', options]],
});
```

## Plugins

This preset includes next plugins with their default options:

- [`spire-plugin-clean`](../spire-plugin-clean/README.md)
- [`spire-plugin-doctoc`](../spire-plugin-doctoc/README.md)
- [`spire-plugin-eslint`](../spire-plugin-eslint/README.md)
- [`spire-plugin-jest`](../spire-plugin-jest/README.md)
- [`spire-plugin-lint-staged`](../spire-plugin-lint-staged/README.md)
- [`spire-plugin-prettier`](../spire-plugin-prettier/README.md)
- [`spire-plugin-semantic-release`](../spire-plugin-semantic-release/README.md)

## Options

This preset allows to disable or override default options for plugins. To do so,
pass an option object with desired plugin keys (`clean`, `doctoc`, `eslint`,
`jest`, `lint-staged`, `prettier` or `semantic-release`). Setting option to
`false` will disable that plugin.

```js
module.exports = () => ({
  extends: [
    [
      'spire-config-default',
      {
        // Disable `spire-plugin-doctoc`
        doctoc: false,
        // Override `spire-plugin-jest`'s config to `jest-preset-acme`
        jest: 'jest-preset-acme',
        // Override `spire-plugin-eslint`'s config and disallow user-provided one
        eslint: {
          config: 'eslint-config-acme',
          allowCustomConfig: false,
        },
      },
    ],
  ],
});
```

Refer to individual plugin docs for list of available options.

## License

MIT &copy; [ResearchGate](https://github.com/researchgate)
