const jwt = require('jsonwebtoken');
const config = require('../config');

class JWT {
  constructor(secret) {
    this.key = secret;
  }

  sign(content, options = {}) {
    return new Promise((resolve, reject) => {
      jwt.sign(content, this.key, options, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  verify(token, options = {}) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.key, options, (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }

  checkValidity(token) {
    return new Promise((resolve) => {
      this.verify(token)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    });
  }
}

module.exports = new JWT(config.webserver.jwt);
