const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

module.exports = async (ctx, next) => {
  // set proxy lookup
  ctx.app.proxy = true;

  // new device
  const device = {};
  const userAgent = ctx.get('user-agent');
  if (
    // check user agent
    /android|ios/i.test(userAgent)
    // debug mobile
    || ctx.path.startsWith('/__mobile')
  ) {
    ctx.request.url = ctx.request.url.replace(/^\/__mobile/, '') || '/';
    device.mobile = true;
  }
  device.ip = ctx.ip;
  device.ua = userAgent;
  ctx.epii.cache('device', device);

  // load server info
  if (!ctx.app.epii.cache('server')) {
    const packageJSON = require('../../package.json');
    const buildOutput = await readFile(path.join(__dirname, '../../build.meta'), 'utf8').catch(() => {});
    const serverInfo = {
      version: packageJSON.version,
      buildId: Number(buildOutput) + 1
    };
    ctx.app.epii.cache('server', serverInfo);
  }

  await next();
};
