module.exports = {
  isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.render('error', {
        message: 'You are not logged in!',
      });
    }
  }
};
