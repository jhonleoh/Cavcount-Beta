#!/usr/bin/env node

// Simple build wrapper that sets environment variables for Next.js build
const { spawn } = require('child_process');

// Process environment variables
process.env.NEXT_DISABLE_TYPESCRIPT_CHECK = 'true';
process.env.NEXT_SKIP_LINT = 'true';
process.env.NEXT_IGNORE_TYPESCRIPT_ERRORS = 'true';
process.env.NEXT_TYPESCRIPT_CHECK = 'false';

// Run the Next.js build command
const buildArgs = ['build', '--no-lint'];
const buildProcess = spawn('next', buildArgs, {
  stdio: 'inherit',
  env: { ...process.env }
});

// Exit with the same code as the build process
buildProcess.on('close', (code) => {
  process.exit(code);
});

// Handle process termination signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    process.exit(0);
  });
});
