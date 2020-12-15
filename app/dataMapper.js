const db = require('./database');

const mapper = {
  getAllFigurines: (callback) => {
    db.query('SELECT * FROM figurine;', (err, result) => {
      
     
      callback(err, result.rows);
    })
  },
  getOneFigurine: (id, callback) => {
    db.query('SELECT * FROM figurine WHERE id = $1;', [id],
    (err, result) =>  {
      callback(err, result.rows[0]);
    })
  }
}

module.exports = mapper;