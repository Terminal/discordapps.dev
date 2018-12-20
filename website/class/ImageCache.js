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
const config = require('../config');

const defaultImage = path.join(__dirname, '..', 'www-root', config.default.image);

class ImageCache {
  constructor({
    url,
    x = 1280,
    y = 720,
    blur = false,
    avatar = false
  }) {
    this.url = url;
    this.x = x;
    this.y = y;
    this.blur = blur;
    this.avatar = avatar;
  }
  get hash() {
    return crypto.createHash('sha256').update(this.url + config.webserver.secret).digest('hex');
  }
  get permalink() {
    return `/appdata/${this.hash}.png`;
  }
  get storagePath() {
    return path.join(__dirname, '..', 'www-root', this.permalink);
  }
  errURL(err) {
    err.message = `${this.url} - ${err.message}`;
    return err;
  }
  useDefaultImage() {
    return sharp(defaultImage)
      .resize(this.x, this.y, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toFile(this.storagePath);
  }
  download() {
    // Fetch the URL of the image
    return fetch(`${config.proxy.host}/${this.url}`, {
      timeout: 30000,
      headers: {
        Authorization: config.proxy.authorization
      }
    })
      .then(res => res.buffer())
      .then(buffer => sharp(buffer))
      .then(image => image.resize(this.x, this.y, {
        fit: 'inside',
        withoutEnlargement: true
      }))
      .then((image) => {
      // If a blur is required, blur the image
        if (this.blur) {
          return image.blur(5);
        }

        // Continue on
        return image;
      })
      .then(image => image.toFile(this.storagePath))
      .catch((err) => {
        this.useDefaultImage();
        // Continue the error to the listener of this promise
        return Promise.reject(this.errURL(err));
      });
  }
  cache() {
    return this.getRecord()
      .then((record) => {
        // If the image is younger than 3 months, do not do anything.
        if (record && record.time + 7776000000 > new Date().getTime()) {
          return Promise.resolve();
        }
        // Otherwise, download the image
        return this.download();
      })
      .then(() => r.table('images') // Update the "last updated" time
        .insert({
          id: this.hash,
          time: new Date().getTime(),
          storagePath: this.storagePath
        }, {
          conflict: 'update'
        })
      );
  }
  getRecord() {
    return r.table('images')
      .get(this.hash);
  }
}

module.exports = ImageCache;
