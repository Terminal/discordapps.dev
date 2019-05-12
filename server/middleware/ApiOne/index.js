import express from 'express';
import ApiOneApps from './apps';

const ApiOne = express.Router();

ApiOne
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
