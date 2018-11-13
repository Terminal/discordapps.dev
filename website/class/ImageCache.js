/**
 * Dumb Media Proxy
 * MIT License
 *
 * Copyright (C) 2015 - 2019 Moustacheminer Server Services
 * Copyright (C) 2017 - 2019 ls.terminal.ink
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

class ImageCache {
  constructor(url) {
    this.url = url;
    this.hash = crypto.createHash('sha256').update(url).digest('hex');
    this.file = path.join(__dirname, '..', 'www-root', 'appdata', `${this.hash}.png`);
  }
  download() {
    return new Promise((resolve, reject) => {
      fetch(this.url)
        .then(res => res.buffer())
        .then((buffer) => {
          sharp(buffer)
            .withoutEnlargement()
            .resize(1280, 720, {
              fit: "inside"
            })
            .toFile(this.file)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
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
          if (record && record.time + 3600000 > new Date().getTime()) {
            resolve();
          } else {
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
                    reject(err);
                  });
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getRecord() {
    return r.table('images')
      .get(this.hash);
  }
}

module.exports = ImageCache;
