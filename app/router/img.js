const express = require('express');
const path = require('path');
const multer = require('multer');
const fileType = require('file-type');
const readChunk = require('read-chunk');
const fs = require('fs');
const uuid = require('uuid/v4');
const r = require('./../modules/rethinkdb');

const router = express.Router();
const types = [
  'jpg',
  'png',
  'gif',
  'webp',
];

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'appdata')),
    filename: (req, file, cb) => cb(null, uuid()),
  }),
  limits: {
    fileSize: 2097152,
  },
});

router.post('/upload/:id', (req, res, next) => {
  r.table('bots')
    .get(req.params.id)
    .run()
    .then((bot) => {
      if (bot) {
        if (bot.images.length > 10) {
          res.status(401).json({
            message: 'Too many images! Delete a few, submit, and come back.',
            ok: false,
          });
        } else {
          next();
        }
      } else {
        res.status(404).json({
          message: 'Bot not found',
          ok: false,
        });
      }
    });
}, upload.single('image'), (err, req, res, next) => {
  if (err) {
    res.status(400).json({
      message: err.message,
      ok: false,
    });
  } else {
    next();
  }
}, (req, res, next) => {
  if (!req.file || !req.file.path) {
    res.status(400).json({
      message: 'No image was uploaded to the server',
      ok: false,
    });
  } else {
    next();
  }
}, (req, res, next) => {
  readChunk(req.file.path, 0, 4100)
    .then((buffer) => {
    // Grab the filetype of the data
      const info = fileType(buffer);

      // If the MIME type is valid, and is the one we want, continue
      if (info && types.includes(info.ext)) {
        next();
      } else {
        // If the MIME type is invalid, delete the file.
        fs.unlink(req.file.path, (err1) => {
          if (err1) {
            res.status(400).json({
              message: 'The file format uploaded is not supported. Additionally, an error occured while deleting your file.',
              ok: false,
            });
          } else {
            res.status(400).json({
              message: 'The file format uploaded is not supported.',
              ok: false,
            });
          }
        });
      }
    })
    .catch(() => {
      res.status(501).json({
        message: 'An error occured while reading the uploaded file',
        ok: false,
      });
    });
}, (req, res) => {
  r.table('bots')
    .get(req.params.id)
    .update({
      images: r.row('images').append(req.file.filename),
    })
    .run();
  // Send the hash of the file to the client.
  res.json({
    ok: true,
    hash: req.file.filename,
  });
})

  .use(express.static(path.join(__dirname, '..', '..', 'appdata')));

module.exports = router;
