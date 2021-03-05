const path = require('path');

const isDebug = process.env.NODE_ENV !== 'production';

module.exports = {
  name: '15ms-web',
  port: 8080,

  path: {
    root: path.join(__dirname, '../'),
    server: {
      controller: 'server/controller',
      middleware: 'server/middleware',
      datasource: 'server/datasource'
    },
    client: 'client',
    layout: 'client/layout',
    static: 'static',
  },

  static: {
    prefix: '__file',
  },

  expert: {
    'well-known': true
  },

  online: !isDebug,

  addons: {
    root: path.join(__dirname, '../../15ms-web-addons'),
    keys: null
  }
};
