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
};
