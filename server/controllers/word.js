const db = require('../../database/connection.js');

const wordController = {};

wordController.get = (req, res, next) => {
  const values = [ (new Date).toDateString() ];
  const query = 'SELECT word FROM words WHERE date = $1'
  db.query(query, values)
    .then(date => {
      res.locals.word = date.rows[0].word;
      return next();
    })
    .catch(err => ({
      message: 'Failed to find word.',
      log: err.message,
      status: 400
    }));
}

wordController.post = (req, res, next) => {
  const { word } = req.body;
  if (word) {
    const values = [ (new Date).toDateString(), word ];
    const query = 'INSERT INTO words (date, word) VALUES ($1, $2)';
    db.query(query, values)
      .then(data => {
        return next();
      })
      .catch(err => next({
        message: 'Failed to add word.',
        log: err.message,
        status: 500
      }));
  }
  else return next({
    message: 'Invalid DELETE request: No word was given.',
    status: 400
  });
}

wordController.delete = (req, res, next) => {
  const { word, date } = req.body;
  if (word) {
    const values = [ word || date ];
    const query = 'DELETE FROM words WHERE word = $1';
    db.query(query, values)
      .then(data => {
        return next();
      })
      .catch(err => next({
        message: 'Failed to delete word.',
        log: err.message,
        status: 500
      }));
  }
  else return next({
    message: 'Invalid DELETE request: No word was given.',
    status: 400
  });
}

module.exports = wordController;