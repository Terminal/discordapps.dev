import express from 'express';
import serverRenderer from './middleware/renderer';
import Locations from '../src/data/Locations';
import 'isomorphic-fetch';

const path = require('path');

const app = express();

app
  .use('^/$', serverRenderer) // Render ROOT with the server
  .use(express.static(
    path.resolve(process.cwd(), 'dist'),
    { maxAge: '30d' }
  ))
  .get('/sitemap.xml', (req, res, next) => {
    fetch(`${Locations.server}/ls13.xml`)
      .then(result => result.text())
      .then(text => 
        res
          .header('Content-Type', 'application/xml')
          .send(text)
      )
      .catch(err => next(err));
  })
  .use('*', serverRenderer) // Render non-static with the server
  .listen(3000, (error) => {
    if (error) {
      return console.log('something bad happened', error);
    }

    console.log('Now listening to 3000');
  });
