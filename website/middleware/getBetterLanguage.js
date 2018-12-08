const config = require('../config');

module.exports = (req, res, next) => {
  if (res.getLocale() !== config.default.language) {
    res.redirect(`/${res.getLocale()}${req.url}`);
  } else {
    next();
  }
};
