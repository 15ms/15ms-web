const epiiServer = require('@epiijs/server')
const config = require('./config/server.js')

if (!config.online) {
  const epiiRender = require('@epiijs/render')
  epiiRender.watch({
    path: config.path,
    logger: true
  });
}

epiiServer(config)
