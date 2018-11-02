const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

app.prepare()
  .then(() => {
    server
      .get('/nexttest', (req, res) => {
        res.send('Yes!');
      })
      .get('*', handle)
      .listen(8080, () => console.log('ready!'));
  });
