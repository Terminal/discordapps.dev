const rethinkdb = require('../modules/rethinkdb');

/**
 * A class that represents a bot.
 */
class Bot {
  /**
   * Read, create and/or edit a bot object.
   * Obtains data from a database if required.
   * @param {Object} bot The bot object
   * @param {string} bot.id The ID of the bot
   * @param {string} [bot.name] The name of the bot
   */
  constructor(bot) {
    // Get existing results, if they exist
    let databaseResult = {}
    if (typeof bot === 'string') {
      databaseResult = await rethinkdb.table('bots').get(bot.id);
    }

    // Assign the inputs to the object
    this.id = bot.id;
    this._name = bot.name || databaseResult.name || '';
    this._invite = bot.invite || databaseResult.invite || '';
    this._prefix = bot.prefix || databaseResult.prefix || '';
    this._description = bot.description || databaseResult.description; // The description
    this._installs = bot.installs || databaseResult.installs || 0; // The number of "installations"
    this._votes = bot.votes || databaseResult.votes || []; // The array of votes
    this._icons = bot.icons || databaseResult.icons || []; // An array of user upload image UUIDs
    this._images = bot.images || databaseResult.images || []; // An array of user upload image UUIDs

    // (Re)upload to the database
    await rethinkdb.table('bots').insert({
      id: this.id,
      name: this.name,
      invite: this.invite,
      prefix: this.prefix,
      description: this.description,
      installs: this.installs,
      votes: this.votes,
      icons: this.icons,
      images: this.images,
    }, {
      conflict: 'update'
    });
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

  get installs() {
    return this._installs;
  }

  get votes() {
    return this._votes;
  }

  get icons() {
    return this._icons;
  };

  get images() {
    return this._images;
  }

  set name(value) {
    this._name = value;
    await rethinkdb.table('bots')
      .get(this.id)
      .update({
        name: value
      });
  }

  set invite(value) {
    this._invite = value;
    await rethinkdb.table('bots')
      .get(this.id)
      .update({
        invite: value
      });
  }

  set prefix(value) {
    this._prefix = value;
    await rethinkdb.table('bots')
      .get(this.id)
      .update({
        prefix: value
      });
  }

  set description(value) {
    this._description = value;
    await rethinkdb.table('bots')
      .get(this.id)
      .update({
        description: value
      });
  }

  set installs(value) {
    this._installs = value;
    await rethinkdb.table('bots')
      .get(this.id)
      .update({
        installs: value
      });
  }

  set votes(value) {
    this._votes = value;
    await rethinkdb.table('bots')
      .get(this.id)
      .update({
        votes: value
      });
  }

  set icons(value) {
    this._icons = value;
    await rethinkdb.table('bots')
      .get(this.id)
      .update({
        icons: value
      });
  }

  set images(value) {
    this._images = value;
    await rethinkdb.table('bots')
      .get(this.id)
      .update({
        images: value
      });
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
}

module.exports = Bot;
