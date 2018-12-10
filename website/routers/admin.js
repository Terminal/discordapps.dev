const express = require('express');
const { isAdmin } = require('../static/middleware');
const r = require('../rethinkdb');
const ImageCache = require('../class/ImageCache');
const crypto = require('crypto');

const router = express.Router();

router
  .use(isAdmin)
  .get('/', (req, res) => {
    res.render('admin');
  })
  .post('/avatars', (req, res, next) => {
    // Force remove cache timeout for all images
    r.table('images')
      .delete()
      .then(() => {
        next();
      })
      .catch((err) => {
        next(err);
      });
  }, (req, res, next) => {
    r.table('bots')
      .then((bots) => {
        const imageCaches = [];
        bots = bots.map((value) => {
          const replacement = {
            id: value.id,
            cachedImages: {
              avatar: null,
              cover: null,
              preview: [],
            }
          };

          if (value.images && typeof value.images.avatar === 'string') {
            const cache = new ImageCache({
              url: value.images.avatar,
              x: 256,
              y: 256,
              blur: value.nsfw
            });
            imageCaches.push({
              value,
              cache
            });
            replacement.cachedImages.avatar = cache.permalink;
          } else {
            replacement.cachedImages.avatar = '/img/logo/logo.svg';
          }

          if (value.images && typeof value.images.cover === 'string') {
            const cache = new ImageCache({
              url: value.images.cover,
              x: 1280,
              y: 720,
              blur: value.nsfw
            });
            imageCaches.push({
              value,
              cache
            });
            replacement.cachedImages.cover = cache.permalink;
          }

          if (value.images && Array.isArray(value.images.preview)) {
            for (let i = 0; i < value.images.preview.length; i += 1) {
              if (typeof value.images.preview[i] === 'string') {
                const cache = new ImageCache({
                  url: value.images.preview[i],
                  x: 1280,
                  y: 720,
                  blur: value.nsfw
                });
                imageCaches.push({
                  value,
                  cache
                });
                replacement.cachedImages.preview[i] = cache.permalink;
              }
            }
          }

          return replacement;
        });

        // Push changes back to database
        r.table('bots')
          .insert(bots, {
            conflict: 'update'
          })
          .then(() => {
            // Download every image every 50 seconds.
            let i = 0;

            const imagePromises = [];
            const nextImage = () => {
              const currentCounter = i;
              imagePromises.push(imageCaches[currentCounter].cache.cache()
                .then(() => ({
                  bot: imageCaches[currentCounter].value,
                  link: imageCaches[currentCounter].cache.url,
                  ok: true,
                  err: null
                }))
                .catch(err => ({
                  bot: imageCaches[currentCounter].value,
                  link: imageCaches[currentCounter].cache.url,
                  ok: false,
                  err
                })));
              // If there's any more images, go to the next one
              if (i < imageCaches.length - 1) {
                i += 1;
                setTimeout(nextImage, 50);
              } else {
                Promise.all(imagePromises)
                  .then((results) => {
                    res.render('faults', {
                      results
                    });
                  });
              }
            };
            nextImage();
          })
          .catch((err) => {
            next(err);
          });
      });
  })
  .post('/tokens', (req, res, next) => {
    r.table('bots')
      .then(bots => bots.map((bot) => {
        const returned = {};
        returned.id = bot.id;
        returned.token = crypto.randomBytes(20).toString('hex');
        return returned;
      }))
      .then((bots) => {
        r.table('bots')
          .insert(bots, {
            conflict: 'update'
          })
          .then(() => {
            res.redirect('/admin');
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;
