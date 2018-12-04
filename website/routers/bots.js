const express = require('express');
const { isOwnerOfBot, isOwnerOfReview, botExists, reviewDoesntExist, isLoggedIn, isLoggedInButJSON, isAdmin } = require('../static/middleware');
const botSchema = require('../schemas/bots');
const reviewSchema = require('../schemas/reviews');
const joi = require('../schemas/joi');
const { unflatten } = require('flat');
const multer = require('multer');
const r = require('../rethinkdb');
const config = require('../config');
const marked = require('marked');
const xss = require('../static/xss');
const ImageCache = require('../class/ImageCache');
const crypto = require('crypto');
const discordWebhooks = require('../static/discordWebhook');
const fetch = require('node-fetch');
const { localise, listMiddleware } = require('../static/list');
const reviewToJsonLd = require('../static/reviewToJsonLd');

const router = express.Router();
const reader = multer();

const selectableLanguages = Object.keys(config.languages).sort((a, b) => {
  if (config.languages[a].top) {
    return -1;
  } else if (config.languages[b].top) {
    return 1;
  } else if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
});

router
  .get('/', listMiddleware({
    filter: {
      verified: true
    }
  }))
  .get('/unverified', listMiddleware({
    filter: {
      verified: false
    }
  }))
  .get('/search', listMiddleware({
    filter: 'search'
  }))
  .get('/by/:id', listMiddleware({
    filter: 'owner'
  }))
  .get('/category/:category', listMiddleware({
    filter: 'category'
  }))
  .get('/:id', (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .merge(bot => ({
        authors: r.table('users').getAll(r.args(bot('authors'))).coerceTo('array'),
        reviews: r.table('reviews')
          .filter(review => review('bot').eq(bot('id')))
          .merge(review => ({
            author: r.table('users').get(review('author'))
          }))
          .sample(5)
          .coerceTo('array'),
        ratings: r.table('reviews')
          .group('rating')
          .filter(review => review('bot').eq(bot('id')))
          .count()
          .ungroup()
      }))
      .default(null)
      .then((item) => {
        if (!item) {
          next();
        } else {
          const displayBot = (userReview) => {
            const bot = localise(item, req);
            const ratings = {};
            const numberOfRatings = bot.ratings.reduce((sum, rating) => sum + rating.reduction, 0);
            let sum = 0;
            let average = null;
            const maximumNumber = bot.ratings.reduce((max, rating) => {
              if (rating.reduction > max) {
                return rating.reduction;
              }
              return max;
            }, 0);

            // The maximum rating is 5.
            // Loop from 1 to including 5
            for (let i = 1; i <= 5; i += 1) {
              const rating = bot.ratings.find(groupedRating => groupedRating.group === i);

              if (rating) {
                sum += rating.reduction * i;
                ratings[i] = {
                  count: rating.reduction,
                  proportion: rating.reduction / numberOfRatings,
                  percentage: (rating.reduction / numberOfRatings) * 100,
                  sliderWidth: (rating.reduction / maximumNumber) * 100
                };
              } else {
                ratings[i] = {
                  count: 0,
                  proportion: 0,
                  percentage: 0,
                  sliderWidth: 0
                };
              }
            }

            if (numberOfRatings > 0) {
              average = (sum / numberOfRatings).toPrecision(2);
            }

            marked.setOptions({
              sanitize: !item.legacy
            });

            const contents = xss[item.legacy ? 'lenient' : 'strict'](marked(bot.contents.page));
            res.render('bot', {
              item: bot,
              contents,
              canEdit: req.user ? bot.authors.some(owner => owner.id === req.user.id) || req.user.admin : false,
              isOwner: req.user ? bot.authors.some(owner => owner.id === req.user.id) : false,
              cover: bot.cachedImages ? bot.cachedImages.cover : null,
              edited: (new Date(item.edited)).toLocaleDateString(req.getLocale(), config.dateformat),
              created: (new Date(item.created)).toLocaleDateString(req.getLocale(), config.dateformat),
              description: bot.contents.description || '',
              avatar: bot.cachedImages ? bot.cachedImages.avatar : null,
              title: bot.contents.name,
              ratings,
              numberOfRatings,
              userReview,
              average,
              schema: reviewToJsonLd(bot, average, numberOfRatings)
            });
          };

          if (req.user) {
            r.table('reviews')
              .filter({
                bot: req.params.id,
                author: req.user.id
              })
              .merge(review => ({
                author: r.table('users').get(review('author'))
              }))
              .then((reviews) => {
                if (reviews && reviews.length === 1) {
                  displayBot(reviews[0]);
                } else {
                  displayBot();
                }
              })
              .catch((err) => {
                next(err);
              });
          } else {
            displayBot();
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/:id/edit', isLoggedIn, isLoggedIn, (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .then((item) => {
        if (item) {
          const remainingLanguages = selectableLanguages.filter(language => !Object.keys(item.contents).includes(language));
          res.render('add', {
            selectableLanguages: remainingLanguages,
            categories: config.categories,
            item,
            layout: 'docs',
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/:id/delete', isLoggedIn, isLoggedIn, (req, res) => {
    res.render('sure');
  })
  .post('/:id/delete', isLoggedIn, isOwnerOfBot, (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .delete()
      .then(() => {
        res.redirect('/');
        discordWebhooks(`<@${req.user.id}> deleted <@${req.params.id}>`);
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/:id/configure', isLoggedIn, isOwnerOfBot, (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .then((item) => {
        if (item) {
          res.render('configure', {
            item
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .post('/:id/token', isLoggedIn, isOwnerOfBot, (req, res, next) => {
    r.table('bots')
      .update({
        id: req.params.id,
        token: crypto.randomBytes(20).toString('hex')
      })
      .then(() => {
        res.redirect(`/bots/${req.params.id}/configure`);
      })
      .catch((err) => {
        next(err);
      });
  })
  .post('/:id/hide', isLoggedIn, isOwnerOfBot, (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .update({
        hide: r.row('hide').not()
      })
      .then(() => {
        res.redirect(`/bots/${req.params.id}/configure`);
      })
      .catch((err) => {
        next(err);
      });
  })
  .post('/:id/approve', isLoggedIn, isAdmin, (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .update({
        verified: true
      })
      .then((result) => {
        if (result.replaced === 1) {
          discordWebhooks(`<@${req.user.id}> approved <@${req.params.id}>`);
        }
        res.redirect('/bots/unverified');
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/:id/deny', isLoggedIn, isAdmin, (req, res) => {
    res.render('sure', {
      reason: true
    });
  })
  .post('/:id/deny', isLoggedIn, isAdmin, (req, res, next) => {
    r.table('bots')
      .get(req.params.id)
      .delete()
      .then(() => {
        discordWebhooks(`<@${req.user.id}> denied <@${req.params.id}>\n${req.body.reason}`);
        res.redirect('/bots/unverified');
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/:id/reviews', (req, res, next) => {
    const limit = parseInt(req.query.limit, 10) > 0 ? parseInt(req.query.limit, 10) : 4;
    const page = parseInt(req.query.page, 10) >= 0 ? parseInt(req.query.page, 10) : 0;
    let title = null;

    const pageString = res.__('pagination.currentPage', {
      number: page + 1
    });

    r.table('bots')
      .get(req.params.id)
      .merge(bot => ({
        authors: r.table('users').getAll(r.args(bot('authors'))).coerceTo('array'),
        reviews: r.table('reviews')
          .filter(review => review('bot').eq(bot('id')))
          .skip(limit * page)
          .limit(limit + 1)
          .merge(review => ({
            author: r.table('users').get(review('author'))
          }))
          .coerceTo('array'),
        ratings: r.table('reviews')
          .group('rating')
          .filter(review => review('bot').eq(bot('id')))
          .count()
          .ungroup()
      }))
      .default(null)
      .then((item) => {
        if (!item) {
          next();
        } else {
          const bot = localise(item, req);
          const ratings = {};
          const numberOfRatings = bot.ratings.reduce((sum, rating) => sum + rating.reduction, 0);
          const maximumNumber = bot.ratings.reduce((max, rating) => {
            if (rating.reduction > max) {
              return rating.reduction;
            }
            return max;
          }, 0);

          if (bot.contents.name) {
            title = `${bot.contents.name} - ${pageString}`;
          } else {
            title = pageString;
          }

          // The maximum rating is 5.
          // Loop from 1 to including 5
          for (let i = 1; i <= 5; i += 1) {
            const rating = bot.ratings.find(groupedRating => groupedRating.group === i);

            if (rating) {
              ratings[i] = {
                count: rating.reduction,
                proportion: rating.reduction / numberOfRatings,
                percentage: (rating.reduction / numberOfRatings) * 100,
                sliderWidth: (rating.reduction / maximumNumber) * 100
              };
            } else {
              ratings[i] = {
                count: 0,
                proportion: 0,
                percentage: 0,
                sliderWidth: 0
              };
            }
          }

          marked.setOptions({
            sanitize: !bot.legacy
          });

          res.render('reviews', {
            item,
            layout: 'docs',
            limit,
            previous: page - 1,
            next: page + 1,
            page,
            isOwnerOfBot: req.user ? bot.authors.some(owner => owner.id === req.user.id) : false,
            cover: bot.cachedImages ? bot.cachedImages.cover : null,
            title,
            ratings,
            numberOfRatings
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  .post('/:id/reviews', isLoggedIn, botExists, reviewDoesntExist, reader.none(), (req, res, next) => {
    req.body['review.bot'] = req.params.id;
    req.body['review.author'] = req.user.id;
    req.body['review.language'] = res.getLocale();
    const body = unflatten(req.body);
    r.table('bots')
      .get(req.params.id)
      .then((bot) => {
        const isAuthor = req.user ? bot.authors.some(owner => owner === req.user.id) : false;
        if (!isAuthor) {
          joi.validate(body.review, reviewSchema, {
            abortEarly: true
          }, (err, value) => {
            if (err) {
              res.json({
                ok: false,
                message: res.__(err.message)
              });
            } else {
              value.date = new Date();
              r.table('reviews')
                .insert(value)
                .then(() => {
                  res.json({
                    ok: true,
                    message: 'ok!',
                    redirect: `/bots/${req.params.id}`
                  });
                })
                .catch((err1) => {
                  next(err1);
                });
            }
          });
        } else {
          res.json({
            ok: false,
            message: res.__('errors.reviews.self')
          });
        }
      });
  })
  .post('/:id/reviews/:review/delete', isLoggedInButJSON, isOwnerOfReview, (req, res, next) => {
    r.table('reviews')
      .get(req.params.review)
      .delete()
      .then(() => {
        res.redirect(`/bots/${req.params.id}/`);
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/add', isLoggedIn, (req, res) => {
    res.render('add', {
      selectableLanguages,
      categories: config.categories,
      layout: 'docs',
      item: {},
    });
  })
  .post('/add', isLoggedInButJSON, reader.none(), (req, res, next) => {
    const body = unflatten(req.body);

    joi.validate(body.bot, botSchema, {
      abortEarly: true
    }, (err, value) => {
      if (err) {
        res.json({
          ok: false,
          message: res.__(err.message)
        });
      } else {
        const insert = (type, message) => {
          const imagePromises = [];
          value.cachedImages = {
            avatar: null,
            cover: null,
            preview: [],
          };

          if (value.images && typeof value.images.avatar === 'string') {
            const cache = new ImageCache(value.images.avatar, 512, 512, value.nsfw);
            imagePromises.push(cache.cache());
            value.cachedImages.avatar = cache.permalink;
          } else {
            value.cachedImages.avatar = '/img/logo/logo.svg';
          }

          if (value.images && typeof value.images.cover === 'string') {
            const cache = new ImageCache(value.images.cover, 1280, 720, value.nsfw);
            imagePromises.push(cache.cache());
            value.cachedImages.cover = cache.permalink;
          }

          if (value.images && Array.isArray(value.images.preview)) {
            for (let i = 0; i < value.images.preview.length; i += 1) {
              if (typeof value.images.preview[i] === 'string') {
                const cache = new ImageCache(value.images.preview[i], 1280, 720, value.nsfw);
                imagePromises.push(cache.cache());
                value.cachedImages.preview[i] = cache.permalink;
              }
            }
          }

          Promise.all(imagePromises)
            .then(() => {
              r.table('bots')
                .insert(value, {
                  conflict: 'replace'
                })
                .then(() => {
                  discordWebhooks(`${req.user.username}#${req.user.discriminator} (${req.user.id}) ${type} <@${value.id}> - ${config.webserver.location}/bots/${value.id}`);
                  res.json({
                    ok: true,
                    message: res.__(message),
                    redirect: `/bots/${value.id}`
                  });
                })
                .catch((err1) => {
                  next(err1);
                });
            })
            .catch((err1) => {
              res.json({
                ok: false,
                message: err1.message
              });
            });
        };

        r.table('bots')
          .get(value.id)
          .then((existingBot) => {
            if (existingBot) {
              if (existingBot.authors.includes(req.user.id) || req.user.admin) {
                // Copy over some stuff while overwriting
                value.verified = existingBot.verified;
                value.legacy = existingBot.legacy;
                value.random = existingBot.random;
                value.token = existingBot.token;
                value.created = existingBot.created || (new Date()).getTime();
                value.edited = (new Date()).getTime();
                value.hide = existingBot.hide;
                insert('edited', 'errors.bots.edit_success');
              } else {
                res.json({
                  ok: false,
                  message: res.__('errors.bots.exists')
                });
              }
            } else {
              value.verified = false;
              value.legacy = false;
              value.random = Math.random();
              value.token = crypto.randomBytes(20).toString('hex');
              value.created = (new Date()).getTime();
              value.edited = (new Date()).getTime();
              value.hide = false;
              fetch(`${config.discord.api}/users/${value.id}`, {
                headers: {
                  Authorization: `Bot ${config.discord.token}`
                }
              })
                .then(result => result.json())
                .then((result) => {
                  if (result.code === 10013) {
                    res.json({
                      ok: false,
                      message: res.__('errors.bots.notfound')
                    });
                  } else if (result.bot) {
                    if (!value.images.avatar) value.images.avatar = `${config.discord.cdn}/avatars/${value.id}/${result.avatar}.png`;
                    insert('added', 'errors.bots.add_success');
                  } else {
                    res.json({
                      ok: false,
                      message: res.__('errors.bots.notabot')
                    });
                  }
                });
            }
          })
          .catch((err1) => {
            next(err1);
          });
      }
    });
  }, (err, req, res, next) => {
    if (err) {
      res.status(500).json({
        ok: false,
        message: err.stack
      });
    } else {
      next();
    }
  });

module.exports = router;
