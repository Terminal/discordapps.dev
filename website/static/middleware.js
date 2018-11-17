const r = require('../rethinkdb');

module.exports = class Middleware {
  static isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(400).render('error', {
        message: res.__('err.permissions.login'),
      });
    }
  }

  static isAdmin(req, res, next) {
    if (req.user.admin) {
      next();
    } else {
      res.status(400).render('error', {
        message: res.__('err.permissions.denied'),
      });
    }
  }

  static isOwner(req, res, next) {
    if (req.user.admin) {
      next();
    } else if (!req.user) {
      res.status(400).render('error', {
        message: res.__('err.permissions.login'),
      });
    } else {
      r.table('bots')
        .get(req.params.id)
        .then((bot) => {
          if (bot.authors.includes(req.user.id)) {
            next();
          } else {
            res.status(400).render('error', {
              message: res.__('err.permissions.denied'),
            });
          }
        });
    }
  }
};
