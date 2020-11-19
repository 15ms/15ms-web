module.exports = [
  {
    path: '/',
    verb: 'get',
    body: async function showStartPage() {
      const device = this.epii.cache('device');
      const server = this.app.epii.cache('server');
      const model = {
        device: { ...device },
        server: { ...server }
      };
      const viewPath = device.mobile ? '/scenes/start-slim' : '/scenes/start-wide';
      return this.epii.view(viewPath, model);
    }
  },
  {
    path: '/debug',
    verb: 'get',
    body: async function showDebugPage() {
      const device = this.epii.cache('device');
      const server = this.app.epii.cache('server');
      const model = {
        device: { ...device },
        server: { ...server, timestamp: Date.now() }
      };
      return this.epii.view('/scenes/debug-slim', model);
    }
  }
];
