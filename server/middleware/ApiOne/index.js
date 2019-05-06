import express from 'express';
import ApiOneApps from './apps';
import databaseConfig from '../../../configuration/server/databaseConfig';

const ApiOne = express.Router();

ApiOne
  .use((req, res, next) => {
    if (!databaseConfig.enabled) {
      res.json({
        ok: false,
        message: 'The database has not been enabled. Edit `/data/databaseConfig.js` with the relevant settings to enable.'
      })
    } else {
      next();
    }
  })
  .use('/apps', ApiOneApps)
  .use((req, res) => {
    res
      .status(404)
      .json({
        ok: false,
        message: 'Route not found'
      })
  })
  .use((err, req, res, next) => {
    if (err) {
      res
        .status(500)
        .json({
          ok: false,
          message: err.message || err,
          data: err.stack
        })
    }
  })

export default ApiOne;
