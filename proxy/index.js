const fetch = require('node-fetch');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.imageProxy = (req, res) => {
  if (req.get('Authorization') !== process.env.TOKEN) {
    return res.status(400).send('Unauthorised');
  }

  if (!req.params.url) {
    return res.status(400).send('No URL sent');
  }

  fetch(req.params.url)
    .then((data) => {
      data.body.pipe(res);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
