const r = require('rethinkdb');
const config = require('config');

r.connect(config.get('rethinkdb')).then((conn) => {
	r.conn = conn;
	r.conn.use(config.get('rethinkdb').db);
});

module.exports = r;
