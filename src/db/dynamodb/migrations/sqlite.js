const sqlite3 = require('sqlite3').verbose();

const CONFIG = require('../../../config');
const db = new sqlite3.Database(CONFIG.SQL.LOCAL.FILENAME);

db.serialize(function() {
  db.run(`CREATE TABLE telemetries (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  type CHAR(20) NOT NULL, 
  value REAL NOT NULL, 
  device TEXT NOT NULL, 
  datetime DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
  );`);
});

db.close();
