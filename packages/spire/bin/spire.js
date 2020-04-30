#!/usr/bin/env node
const spire = require('spire');

spire().then((code) => {
  process.exitCode = code;
});
