#!/usr/bin/env node
const spire = require('@rg/spire');

async function main() {
  try {
    return await spire();
  } catch (reason) {
    throw reason;
  }
}

main().then(code => {
  process.exitCode = code;
});
