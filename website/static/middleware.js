const r = require('../rethinkdb');

module.exports = class Middleware {
  static isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(401).render('error', {
        message: res.__('errors.permissions.login'),
      });
    }
  }

  /**
   * A router which checks if the user is logged in or not.
   * If the user is not logged in, respond with JSON.
   * @param {*} req Request
   * @param {*} res Response
   * @param {*} next Next
   */
  static isLoggedInButJSON(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(401).json({
        err: true,
        message: res.__('errors.permissions.login')
      });
    }
  }

  static isAdmin(req, res, next) {
    if (req.user && req.user.admin) {
      next();
    } else {
      res.status(401).render('error', {
        message: res.__('errors.permissions.denied'),
      });
    }
  }

  static isOwnerOfBot(req, res, next) {
    if (req.user.admin) {
      next();
    } else if (!req.user) {
      res.status(401).render('error', {
        message: res.__('errors.permissions.login'),
      });
    } else {
      r.table('bots')
        .get(req.params.id)
        .then((bot) => {
          if (!bot) {
            next('router');
          } else if (bot.authors.includes(req.user.id)) {
            next();
          } else {
            res.status(401).render('error', {
              message: res.__('errors.permissions.denied'),
            });
          }
        });
    }
  }

  static botExists(req, res, next) {
    r.table('bots')
      .get(req.params.id)
      .then((bot) => {
        if (!bot) {
          next('router');
        } else if (bot.state === 'approved') {
          next();
        } else if (!req.user) {
          next('router');
        } else if (bot.authors.includes(req.user.id)) {
          next();
        } else if (req.user.admin) {
          next();
        } else {
          next('router');
        }
      });
  }

  static reviewDoesntExist(req, res, next) {
    r.table('reviews')
      .filter({
        bot: req.params.id,
        author: req.user.id
      })
      .count()
      .then((exists) => {
        if (exists) {
          res.status(400).json({
            err: true,
            message: 'A review already exists!'
          });
        } else {
          next();
        }
      });
  }

  static isOwnerOfReview(req, res, next) {
    if (req.user.admin) {
      next();
    } else if (!req.user) {
      res.status(401).render('error', {
        message: res.__('errors.permissions.login'),
      });
    } else {
      r.table('reviews')
        .get(req.params.review)
        .then((review) => {
          if (!review) {
            next('router');
          } else if (review.author === req.user.id) {
            next();
          } else {
            res.status(401).render('error', {
              message: res.__('errors.permissions.denied'),
            });
          }
        });
    }
  }
};
