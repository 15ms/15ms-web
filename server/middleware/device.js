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
  ctx.epii.cache('device', device);
  await next();
};
