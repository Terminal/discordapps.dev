module.exports = lang => (req, res, next) => {
  res.setLocale(lang);
  res.locals.unlocalisedUrl = req.originalUrl.substr(lang + 1);
  next();
};
