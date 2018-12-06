/**
 * Dumb Media Proxy
 * MIT License
 *
 * Copyright (C) 2015 - 2018 Moustacheminer Server Services
 * Copyright (C) 2017 - 2018 ls.terminal.ink
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const crypto = require('crypto');
const path = require('path');
const fetch = require('node-fetch');
const sharp = require('sharp');
const r = require('../rethinkdb');
const config = require('../config');

const defaultImage = path.join(__dirname, '..', 'www-root', config.default.image);

class ImageCache {
  constructor(url, x = 1280, y = 720, blur = false) {
    this.url = url;
    this.hash = crypto.createHash('sha256').update(url + config.webserver.secret).digest('hex');
    this.permalink = `/appdata/${this.hash}.png`;
    this.file = path.join(__dirname, '..', 'www-root', 'appdata', `${this.hash}.png`);
    this.x = x;
    this.y = y;
    this.blur = blur;
  }
  errURL(err) {
    err.message = `${this.url} - ${err.message}`;
    return err;
  }
  download() {
    return new Promise((resolve, reject) => {
      const useDefaultImage = (err) => {
        sharp(defaultImage)
          .resize(this.x, this.y, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .toFile(this.file)
          .then(() => {
            // Reject the error which caused the image to not be able to download
            reject(err);
          })
          .catch((err1) => {
            // Reject the error which happened when resizing the default image
            reject(err1);
          });
      };

      // Fetch the URL of the image
      fetch(`${config.proxy.host}/${this.url}`, {
        timeout: 30000,
        headers: {
          Authorization: config.proxy.authorization
        }
      })
        .then(res => res.buffer())
        .then((buffer) => {
          let image = sharp(buffer);

          // Resize the image
          image = image.resize(this.x, this.y, {
            fit: 'inside',
            withoutEnlargement: true
          });

          // If a blur is required, blur the image
          if (this.blur) {
            image = image.blur(5);
          }

          // Save the image to file.
          image
            .toFile(this.file)
            .then(() => {
              // Finshed saving.
              resolve();
            })
            .catch((err) => {
              // If the manipulation failed, use the default image
              useDefaultImage(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  cache() {
    return new Promise((resolve, reject) => {
      this.getRecord()
        .then((record) => {
          // If the image is younger than 3 months, do not do anything.
          if (record && record.time + 7776000000 > new Date().getTime()) {
            resolve();
          } else {
            // Download the image
            this.download()
              .then(() => {
                r.table('images')
                  .insert({
                    id: this.hash,
                    time: new Date().getTime()
                  }, {
                    conflict: 'update'
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(this.errURL(err));
                  });
              })
              .catch((err) => {
                reject(this.errURL(err));
              });
          }
        })
        .catch((err) => {
          reject(this.errURL(err));
        });
    });
  }
  getRecord() {
    return r.table('images')
      .get(this.hash);
  }
}

module.exports = ImageCache;
