const config = require('../../config/server.js')

module.exports = {
  head: {
    icon: 'assets/images/15ms.png',
    title: '15ms',
    metas: {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0'
    }
  },
  body: {
    holder: {
      raw: '<div id="app"></div>'
    },
    scripts: config.online
      ? [
        '//cdn.bootcss.com/react/16.2.0/umd/react.production.min.js',
        '//cdn.bootcss.com/react-dom/16.2.0/umd/react-dom.production.min.js',
        { src: 'https://s4.cnzz.com/z_stat.php?id=1279733309&web_id=1279733309', type: 'application/javascript' },
      ] : [],
  }
};
