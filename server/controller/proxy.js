/* eslint-disable global-require */

const path = require('path');
const config = require('../../config/server');
const datasourceDir = path.join(__dirname, '../datasource');

module.exports = [
  {
    path: '/proxy/:action',
    verb: ['get', 'post', 'put', 'delete'],
    body: async function doProxyAction() {
      const { action } = this.params;
      const actionPath = path.join(datasourceDir, `${action}.js`);
      let actionCall = null;
      try {
        delete require.cache[require.resolve(actionPath)];
        actionCall = require(actionPath);
      } catch (error) {
        return this.epii.json({ state: false, error: 'cannot reload proxy action' });
      }
      try {
        const result = await actionCall(this);
        return this.epii.json({ state: true, model: result });
      } catch (error) {
        return this.epii.json({ state: false, error: error.message });
      }
    }
  },
  {
    path: '/addon/:addonURI*',
    verb: 'get',
    body: async function showAddonPage() {
      let { addonURI } = this.params;
      if (addonURI.indexOf('..') >= 0) {
        this.status = 403;
        return this.epii.text('unsafe request');
      }
      if (addonURI.indexOf('/') < 0) {
        addonURI = addonURI + '/index.html';
        return this.epii.jump(`/addon/${addonURI}`);
      }
      const addonPath = path.join(config.addons.root, addonURI);
      return this.epii.file(addonPath, 'play');
    }
  }
];
