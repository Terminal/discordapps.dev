import express from 'express';
import serverRenderer from './middleware/renderer';
const path = require('path');

const app = express();

app
  .use('^/$', serverRenderer) // Render ROOT with the server
  .use((req, res, next) => {console.log(path.resolve(__dirname, '..', 'build'));next()}, express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' }
  ))
  .use('*', serverRenderer) // Render non-static with the server
  .listen(3000, (error) => {
    if (error) {
      return console.log('something bad happened', error);
    }

    console.log('Now listening to 3000');
  });
