const sqlite3 = require('sqlite3').verbose();

const CONFIG = require('../config');
const db = new sqlite3.Database(CONFIG.SQL.LOCAL.FILENAME);

function insert(data) {
  const {type, value, device} = data;
  const stmt = db.prepare('INSERT INTO telemetries (type, value, device) VALUES (?, ?, ?);');
  stmt.run(type, value, device);
  stmt.finalize();
  db.close();
}

module.exports = {
  insert,
};
