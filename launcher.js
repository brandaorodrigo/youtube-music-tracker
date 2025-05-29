const { spawn } = require('child_process');
const path = require('path');

const ___dirname = typeof process.pkg !== 'undefined' ? path.dirname(process.execPath) : __dirname;

const server = spawn(process.argv[0], [path.join(___dirname, 'server.js')], {
  detached: true,
  stdio: 'ignore',
  windowsHide: true
});

server.unref();

process.exit(0);
