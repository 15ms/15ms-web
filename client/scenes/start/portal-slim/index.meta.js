module.exports = {
  base: 'modern',
  head: {
    metas: [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'full-screen', content: 'true' }
    ],
    styles: 'scenes/start/portal-slim/index.css'
  },
  body: {
    scripts: 'scenes/start/portal-slim/index.js'
  }
}
