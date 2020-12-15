require('dotenv').config();

const db = require('./app/database');

db.query('SELECT * FROM figurine;', (err, result) => {
  console.log(result.rows[2]);
})