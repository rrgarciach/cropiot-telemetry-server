const mysql = require('mysql2/promise');

const CONFIG = require('../../../config');

mysql.createConnection(CONFIG.MYSQL.LOCAL)
  .then(conn => {
    conn.execute(`CREATE TABLE telemetries (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
      type VARCHAR(20) NOT NULL, 
      value FLOAT NOT NULL, 
      device VARCHAR(20) NOT NULL, 
      datetime DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
      ) ENGINE InnoDB;`)
      .then(console.log)
      .catch(console.error)
      .finally(() => {
        conn.close();
        process.exit(0);
      });
  })
  .catch(console.error);
