const mysql = require('mysql2');
const fromEnv = require('../.env');

const pool = mysql.createPool({
  host: fromEnv.DATABASE_USERNAME,
  user: fromEnv.DATABASE_PASSWORD,
  database: fromEnv.DATABASE_NAME,
});

module.exports = pool.promise();
