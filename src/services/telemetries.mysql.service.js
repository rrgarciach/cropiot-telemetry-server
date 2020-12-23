const mysql = require('mysql2/promise');

const CONFIG = require('../config');

const pool = mysql.createPool({
  ...CONFIG.MYSQL.LOCAL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function insert(data) {
  const {type, value, device} = data;
  const values = [type, value, device];
  const stmt = 'INSERT INTO telemetries (type, value, device) VALUES (?, ?, ?);';
  return _getConnection()
    .then(conn => {
      return conn.execute(stmt, values)
        .then(console.log)
    })
    .catch(console.error);
}

function _getConnection() {
  return pool.getConnection();
}

module.exports = {
  insert,
};
