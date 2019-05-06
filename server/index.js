import express from 'express';
import fs from 'fs';
import 'isomorphic-fetch';
import Locations from '../client/data/Locations';
import ReactRenderer from './middleware/ReactRenderer';
import robotsTxt from './data/robots.txt'
import ApiOne from './middleware/ApiOne';

const path = require('path');

const app = express();

const ROBOTS = fs.readFileSync(path.join(__dirname, robotsTxt), {
  encoding: 'utf-8'
})

app
  .set('json spaces', 4)
  .get('/robots.txt', (req, res) => {
    res.send(ROBOTS);
  })
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
  .use('/api/v1', ApiOne) // API server
  .use('^/$', ReactRenderer) // Render ROOT with the server
  .use(express.static(
    path.resolve(process.cwd(), 'dist'),
    { maxAge: '30d' }
  ))
  .use('*', ReactRenderer) // Render non-static with the server
  .listen(3000, (error) => {
    if (error) {
      return console.log('something bad happened', error);
    }

    console.log('Now listening to 3000');
  });
