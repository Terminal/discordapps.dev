const express = require('express');
const { isAdmin } = require('../static/middleware');
const r = require('../rethinkdb');
const ImageCache = require('../class/ImageCache');

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
            const cache = new ImageCache(value.images.avatar, 512, 512);
            imageCaches.push({
              value,
              cache
            });
            replacement.cachedImages.avatar = cache.permalink;
          }

          if (value.images && typeof value.images.cover === 'string') {
            const cache = new ImageCache(value.images.cover, 1280, 720);
            imageCaches.push({
              value,
              cache
            });
            replacement.cachedImages.cover = cache.permalink;
          }

          if (value.images && Array.isArray(value.images.preview)) {
            for (let i = 0; i < value.images.preview.length; i += 1) {
              if (typeof value.images.preview[i] === 'string') {
                const cache = new ImageCache(value.images.preview[i], 1280, 720);
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
              imagePromises.push(imageCaches[i].cache.cache()
                .then(() => ({
                  bot: imageCaches[i].value,
                  link: imageCaches[i].cache.url,
                  ok: true,
                  err: null
                }))
                .catch(err => ({
                  bot: imageCaches[i].value,
                  link: imageCaches[i].cache.url,
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
                    console.log(results);
                    res.status(200).render('faults', {
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
  });

module.exports = router;
