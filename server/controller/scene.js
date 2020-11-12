const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = [
  {
    path: '/',
    verb: 'get',
    body: async function showStartPage() {
      const device = this.epii.cache('device');
      const model = {
        device: Object.assign({
          ip: this.ip,
          ua: this.headers['user-agent']
        }, device)
      };
      const packageJSON = require('../../package.json');
      const buildOutput = await readFile(path.join(__dirname, '../../build.meta'), 'utf8').catch(() => {});
      model.server = {
        version: packageJSON.version,
        buildId: Number(buildOutput) + 1
      };
      return this.epii.view(
        device.mobile ? '/scenes/start/portal-slim' : '/scenes/start/portal-wide',
        model
      );
    }
  },
];
