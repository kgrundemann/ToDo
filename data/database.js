const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'todo-list',
  user: 'root',
  password: 'Test123',
});

module.exports = pool;
