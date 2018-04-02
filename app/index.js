require('./helpers/logo');
const express = require('express');
const bodyParser = require('body-parser');
const r = require('./modules/rethinkdb');

const app = express();

app.use(bodyParser.json())
  .set('json spaces', 2)
  .get('/', (req, res) => {
    res.json({
      message: 'Welcome to the ls.terminal.ink API server',
    });
  })
  .get('/bots', (req, res) => {
    r.table('bots')
      .without('token')
      .run()
      .then((bots) => {
        res.json(bots);
      });
  });

app.listen(8080);
