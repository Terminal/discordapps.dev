const express = require('express');
const next = require('next');
const accepts = require('accepts');
const locales = require('./locales');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

app.prepare()
  .then(() => {
    server
      .use((req, res, carryon) => {
        const accept = accepts(req);
        req.locale = accept.language(Object.keys(locales)) || 'en';
        carryon();
      })
      .get('/nexttest', (req, res) => {
        res.send('Yes!');
      })
      .get('*', handle)
      .listen(8080, () => console.log('ready!'));
  });
