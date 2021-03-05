const childProcess = require('child_process');
const epiiRender = require('@epiijs/render');
const config = require('./config/server.js');

epiiRender.buildOnce({
  path: config.path,
  filter: 'component',
  extern: 'react',
  logger: true
});

childProcess.exec('bin/post-build', (error, stdout, stderr) => {
  if (error) console.error(error);
});