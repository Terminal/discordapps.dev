const express = require('express');
const { isOwnerOfReview, botExists, reviewDoesntExist, isLoggedIn, isLoggedInButJSON } = require('../static/middleware');

const joi = require('../schemas/joi');
const { unflatten } = require('flat');
const multer = require('multer');
const r = require('../rethinkdb');
const { localise } = require('../static/list');
const reviewSchema = require('../schemas/reviews');
const checkParamsLength = require('../middleware/checkParamsLength');

const router = express.Router({
  mergeParams: true
});
const reader = multer();

router.get('/', (req, res, next) => {
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
        const bot = localise(item, res);
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
  .post('/', isLoggedIn, botExists, reviewDoesntExist, reader.none(), (req, res, next) => {
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
  .post('/:review/delete', checkParamsLength, isLoggedInButJSON, isOwnerOfReview, (req, res, next) => {
    r.table('reviews')
      .get(req.params.review)
      .delete()
      .then(() => {
        res.redirect(`${res.locals.languagePrefix}/bots/${req.params.id}/`);
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;
