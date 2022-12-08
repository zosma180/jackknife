#!/usr/bin/env node

'use strict';
import { exec, execSync } from 'child_process';

// Clean the bundle
execSync('rm -rf test/bundle');

// Lint the sources
try {
  execSync('npm run lint', { stdio: 'inherit' });
} catch (e) {
  error('Lint failed, operation aborted.');
}

// Compile the sources and watch them
const tsc = exec('npx tsc -w --project test/tsconfig.json');
let server;

tsc.stdout.on('data', data => {
  console.log(`TSC ${data}`);

  if (data.includes('Found 0 errors') && !server) {
    // Run the local test server
    server = exec('npx browser-sync start --server -c test/bs-config.cjs');
    server.stdout.on('data', data => console.log(`LS ${data}`));
    server.stderr.on('data', data => error(`LS ${data}`));
    server.on('close', code => {
      tsc.kill();
      process.exit(code);
    });
  }
});

tsc.stderr.on('data', data => {
  console.error(`TSC ${data}`);
  error('Build failed, operation aborted.');
});

// Error function
function error(message) {
  console.error('\x1b[41m%s\x1b[0m', message, '\n');
  process.exit(1);
}