module.exports = {
  base: 'modern',
  head: {
    metas: [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'full-screen', content: 'true' }
    ],
    styles: 'scenes/debug-slim/index.css'
  },
  body: {
    scripts: 'scenes/debug-slim/index.js'
  }
}
