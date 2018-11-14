const xss = require('xss');
const ImageCache = require('../class/ImageCache');

module.exports = html => new Promise((resolve, reject) => {
  const promises = [];

  const output = xss(html, {
    whiteList: {
      iframe: ['src', 'class'],
      style: [],
      link: ['href', 'rel', 'type'],
      ...xss.whiteList
    },
    onTagAttr(tag, name, value) {
      if (tag === 'img' && name === 'src') {
        const cache = new ImageCache(value);
        // Marked is synchronous. This hack makes it do Marked, download, and then render.
        promises.push(cache.cache());
        return `src="${cache.permalink}"`;
      }
      return undefined;
    }
  });

  Promise.all(promises)
    .then(() => {
      resolve(output);
    })
    .catch((err) => {
      reject(err);
    });
});
