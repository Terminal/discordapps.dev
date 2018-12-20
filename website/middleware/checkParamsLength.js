module.exports = (req, res, next) => {
  const keys = Object.keys(req.params);
  let fail = false;

  for (let i = 0; i < keys.length; i += 1) {
    if (req.params[keys[i]].length > 127) {
      fail = true;
    }
  }

  if (fail) {
    // Send a 404 error if any params are too long
    res.status(404).render('error', {
      message: res.__('pages.error.notfound')
    });
  } else {
    next();
  }
};
