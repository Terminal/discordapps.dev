const express = require('express');
const { isOwnerOfReview, botExists, reviewDoesntExist, isLoggedIn, isLoggedInButJSON } = require('../static/middleware');

const joi = require('../schemas/joi');
const { unflatten } = require('flat');
const multer = require('multer');
const r = require('../rethinkdb');
const reviewSchema = require('../schemas/reviews');
const checkParamsLength = require('../middleware/checkParamsLength');

const router = express.Router({
  mergeParams: true
});
const reader = multer();

router
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
                message: res.__(err.message),
                language: err.message
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
            message: res.__('errors.reviews.self'),
            language: 'errors.reviews.self'
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
