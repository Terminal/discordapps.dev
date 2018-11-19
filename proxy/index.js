const express = require('express');
const fetch = require('node-fetch');
const config = require('./config.json');

const app = express();

console.log(config);

app.get('*', (req, res, next) => {
  if (req.get('Authorization') === config.webserver.authorization) {
    next();
  } else {
    res.status(400).send('Unauthorised');
  }
}, (req, res) => {
  fetch(req.originalUrl.substr(1))
    .then((data) => {
      data.body.pipe(res);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
})
  .listen(config.webserver.port);
