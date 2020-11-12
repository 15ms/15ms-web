const config = require('../../config/server.js')

module.exports = {
  head: {
    icon: 'assets/images/rwby.png',
    title: 'Sartrey LEE',
    metas: {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0'
    }
  },
  body: {
    holder: {
      source: '<div id="app"></div>'
    },
    scripts: config.online
      ? [
        '//cdn.bootcss.com/react/16.2.0/umd/react.production.min.js',
        '//cdn.bootcss.com/react-dom/16.2.0/umd/react-dom.production.min.js'
      ]
      : [],
  }
};
