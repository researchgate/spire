#!/usr/bin/env node
const createSpireApp = require('create-spire-app');

async function main() {
  try {
    return await createSpireApp();
  } catch (reason) {
    throw reason;
  }
}

main().then(code => {
  process.exitCode = code;
});
