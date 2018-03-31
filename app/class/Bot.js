const rethinkdb = require('../modules/rethinkdb');
const crypto = require('crypto');

/**
 * A class that represents a bot.
 * Includes data synchronisation with RethinkDB, so everything is fancy dancy
 */
class Bot {
  /**
   * Creates or obtains a bot object.
   * Obtains data from a database if required.
   * @param {string} bot The ID of the bot
   */
  constructor(bot) {
    // Get existing results, if they exist
    if (typeof bot !== 'string') {
      throw new Error('The constructor should give a string')
    }

    this._id = bot;
    this._name = 'Unknown Name';
    this._invite = 'https://example.com/';
    this._prefix = 'Unknown Prefix';
    this._description = '';
    this._owners = new Map();
    this._token = crypto.randomBytes(64).toString('hex');
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get invite() {
    return this._invite;
  }

  get prefix() {
    return this._prefix;
  }

  get description() {
    return this._description;
  }

  get token() {
    return this._token;
  }

  set id(value) {
    throw new Error('Editing the ID is strictly prohibited');
  }

  set name(value) {
    if (typeof value !== 'string') throw new Error('Value needs to be a string');
    if (value.length > 32) throw new Error('Value length exceeds 32 characters');
    this._name = value;
  }

  set invite(value) {
    if (typeof value !== 'string') throw new Error('Value needs to be a string');
    if (value.length > 256) throw new Error('Value length exceeds 256 characters');
    this._invite = value;
  }

  set prefix(value) {
    if (typeof value !== 'string') throw new Error('Value needs to be a string');
    if (value.length > 32) throw new Error('Value length exceeds 32 characters');
    this._prefix = value;
  }

  set description(value) {
    if (typeof value !== 'string') throw new Error('Value needs to be a string');
    if (value.length > 8096) throw new Error('Value length exceeds 8096 characters');
    this._description = value;
  }

  /**
   * Delete the application
   * @returns {Promise} The promise from RethinkDB that deletes the application
   */
  delete() {
    return rethinkdb.table('bots')
      .get(this.id)
      .delete();
  }

  /**
   * Reset the token of the application
   * @returns {Promise} The promise from RethinkDB that resets the token
   */
  resetToken() {
    const token = crypto.randomBytes(64).toString('hex');
    this._token = token;
    return rethinkdb.table('bots')
      .insert({
        id: this._id,
        token: token
      }, {
        conflict: 'update'
      });
  }

  /**
   * Add or set an owner of the bot with a permission level
   * @returns {Promise} The promise from RethinkDB that added or set the user
   */
  setOwner(id, permission) {
    if (!id) return Promise.reject('No ID was provided');
    if (!permission) permission = 0;
    this._owners.set(id, permission);
    return rethinkdb.table('bots')
      .insert({
        id: this._id,
        owners: Array.from(this._owners)
      }, {
        conflict: 'update'
      });
  }

  /**
   * Remove an owner of the bot
   * @returns {Promise} The promise from RethinkDB that removed the user
   */
  removeOwner(id) {
    if (!id) return Promise.reject('No ID was provided');
    this._owners.delete(id);
    return rethinkdb.table('bots')
      .insert({
        id: this._id,
        owners: Array.from(this._owners)
      }, {
        conflict: 'update'
      });
  }

  /**
   * Get the current data from the database
   */
  get() {
    return new Promise((resolve, reject) => {
      rethinkdb.table('bots').get(this._id).then((databaseResult) => {
        this._name = databaseResult.name || 'Unknown Name';
        this._invite = databaseResult.invite || 'https://example.com/';
        this._prefix = databaseResult.prefix || 'Unknown Prefix';
        this._description = databaseResult.description;
        this._owners = new Map(databaseResult.owners);
        this._token = crypto.randomBytes(64).toString('hex');
        resolve();
      })
    });
  }

  /**
   * Post the current data to the database
   * @returns {Promise} The promise from RethinkDB that removed the user
   */
  post() {
    return rethinkdb.table('bots').insert({
      id: this._id,
      name: this._name,
      invite: this._invite,
      prefix: this._prefix,
      description: this._description,
      owners: Array.from(this._owners),
      token: this._token
    }, {
      conflict: 'update'
    });
  }
}

module.exports = Bot;
