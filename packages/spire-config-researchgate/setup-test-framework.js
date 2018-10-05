/* eslint-env jest */
import { toMatchSnapshot } from 'jest-snapshot';

// Increate default timeout to 20s (can be overridden)
jest.setTimeout(1000 * 20);

// Avoid loading web-specific stuff in node test env.
if (typeof window === 'object') {
  // Load web-specific polyfills
  require('raf/polyfill');
  require('matchmedia-polyfill');
  require('matchmedia-polyfill/matchMedia.addListener');
  // Load enzyme
  require('jest-enzyme');
  const { configure } = require('enzyme');
  const Adapter = require('enzyme-adapter-react-16');
  configure({ adapter: new Adapter() });
}

// Lazy load renderers since they're optional
expect.extend({
  toMatchReactSnapshot(received, ...args) {
    const renderer = require('react-test-renderer');
    const tree = renderer.create(received).toJSON();
    return toMatchSnapshot.call(this, tree, ...args);
  },
  toMatchStaticReactSnapshot(received, ...args) {
    const { renderToStaticMarkup } = require('react-dom/server');
    const prettier = require('prettier');
    const markup = renderToStaticMarkup(received);
    const formatted = prettier.format(markup, { parser: 'parse5' });
    return toMatchSnapshot.call(this, formatted, ...args);
  },
});
