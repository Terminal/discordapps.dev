module.exports = res => ({
  name: res.__('site.name'),
  short_name: res.__('pages.bots.shortname'),
  scope: `${res.locals.languagePrefix}/?source=manifest`,
  background_color: '#181818',
  theme_color: '#3498db',
  display: 'standalone',
  start_url: `${res.locals.languagePrefix}/`,
  icons: [
    {
      src: '/img/logo/logo512.png',
      sizes: '512x512',
      type: 'image/png'
    },
    {
      src: '/img/logo/logo256.png',
      sizes: '256x256',
      type: 'image/png'
    },
    {
      src: '/img/logo/logo128.png',
      sizes: '128x128',
      type: 'image/png'
    },
    {
      src: '/img/logo/logo64.png',
      sizes: '64x64',
      type: 'image/png'
    },
    {
      src: '/img/logo/logo32.png',
      sizes: '32x32',
      type: 'image/png'
    },
    {
      src: '/img/logo/logo16.png',
      sizes: '16x16',
      type: 'image/png'
    },
    {
      src: '/img/logo/logo.svg',
      sizes: '72x72 96x96 144x144 152x152 192x192 384x384',
      type: 'image/svg+xml'
    }
  ]
});
