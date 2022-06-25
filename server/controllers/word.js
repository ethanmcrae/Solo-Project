const db = require('../../database/connection.js');

const wordController = {};

const _getTodaysWord = async () => {
  const values = [ (new Date).toDateString() ];
  const query = 'SELECT word FROM words WHERE date = $1'
  const data = await db.query(query, values);
  if (data.rows[0]) return data.rows[0].word;
}

wordController.post = async (req, res, next) => {
  const { word } = req.body;
  if (word) {
    const values = [ (new Date).toDateString(), word ];
    const query = 'INSERT INTO words (date, word) VALUES ($1, $2)';
    db.query(query, values)
      .then(() => {
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
    log: 'No word was given. Could not post.',
    status: 400
  });
}

wordController.delete = async (req, res, next) => {
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
    log: 'No word was given. Could not delete.',
    status: 400
  });
}

wordController.exists = async (req, res, next) => {
  // Get the 5 letter word from the request
  const { word } = req.body;

  // Check to see if the word exists in our 5-letter word database
  const values = [ word ];
  const query = 'SELECT word FROM possible_words WHERE word = $1'
  const data = await db.query(query, values);

  // If it exists: set the status to good
  if (data.rows[0]) res.locals.status = 200;
  // If it doesn't exist: set the status to bad
  else res.locals.status = 400;

  return next();
}

wordController.check = async (req, res, next) => {
  // Exit early if an invalid word was given
  if (res.locals.status === 400) return next();

  // Get the 5 letter word from the request
  const { word, first } = req.body;

  // Get the word of the day
  const correctWord = await _getTodaysWord();

  // There is no word of the day
  if (!correctWord) return next({
    log: 'No word of the day',
    message: 'No word of the day.',
    status: 500
  });

  // TODO: Add a check to only show 1 yellow when there is 1 of the letter

  // Return status codes for each letter
  const wordStatus = []
  for (let i = 0; i < word.length; i++) {
    // The current letter
    const letter = word[i];
    const correctLetter = correctWord[i];

    // Check to see if the letter is in the correct spot (status code: green)
    if (letter === correctLetter) wordStatus.push('green');
    // Check to see if the letter is in a different spot (status code: yellow)
    else if (correctWord.includes(letter)) wordStatus.push('yellow');
    // Otherwise, the letter is not in this word (status code: black)
    else wordStatus.push('black');
  }

  /**
   * LEFT OFF
   * --------
   * 
   * 1. [X] Uncomment the following code
   * 2. [ ] We can't use "first".
   *  2a. [ ] Refactor the front-end with an added state: "currentRow"
   *  2b. [ ] Add a column to the "games" table: "current_row" (SMALLINT)
   *  2c. [ ] Update the currentRow to the database
   * 3. [ ] Load the latest game data on page load
   *  3a. [ ] If it's not loaded yet: create 6 rows and assign those to a new game in the database
   *  3b. [X] Also add a "friend" (INT) column in the "games" table. (null will represent DAILY, otherwise it will represent a user_id)
   *  3c. [ ] When searching for a game, search for a game that matches the "user_id" and "friend" (null) and date (new Date.toDateString())
   */

  // If this is the first row
  if (currentRow === 1) {
    // Create a game in the database
    const values = [];
    const query = 'INSERT INTO games (user_id, created, row)';
    db.query
  }

  // Update the row in the database
  const values = [ word[0], word[1], word[2], word[3], word[4], wordStatus[0], wordStatus[1], wordStatus[2], wordStatus[3], wordStatus[4] ];
  const query = 'INSERT INTO rows (char1, char2, char3, char4, char5, color1, color2, color3, color4, color5), VALUES ($1 $2 $3 $4 $5 $6 $7 $8 $9 $10)';
  const row = {}

  res.locals.wordStatus = wordStatus;
  return next();
}

wordController.statistics = (req, res, next) => {
  // Access the word status codes
  const { rows, letters } = req.body;
  rows.push(letters);  // letters represents the most recent row that was completed by the user
  // Letter status by column
  const columns = [{ avoid: [] }, { avoid: [] }, { avoid: [] }, { avoid: [] }, { avoid: [] }];

  // Iterate through the rows of word data
  for (const row of rows) {
    // Ignore incomplete rows
    if (row) {
      // Iterate through the word data to populate column data
      row.forEach((letterStatus, i) => {
        const { letter, color } = letterStatus;
        
        // If the color is green, preserve it
        if (color === 'green') columns[i].letter = letter;
        // If the color is yellow, prevent it
        else if (color === 'yellow') columns[i].avoid.push(letter);
        // If the color is black, prevent it globally
        else if (color === 'black') columns.forEach(column => column.avoid.push(letter))
      });
    }
  }

  // Value to be queried
  let value = '';
  // Iterate through columns to determine value
  for (const column of columns) {
    const { letter, avoid } = column;

    // If there is a correct letter: set it
    if (letter) value += letter;
    // Otherwise: concat each letter to avoid for this column
    else value += avoid.length > 0 ? ('[^' + avoid.join('') + ']') : '.';
  }

  // Construct a query string
  const query = 'SELECT word FROM possible_words WHERE word ~ $1';
  console.log('value ->', value);
  // Use the value to find possible words
  db.query(query, [ value ])
    .then(data => {
      res.locals.words = data.rows;
      return next();
    })
    .catch(err => next({
      message: 'Failed to query possible words.',
      log: err.message,
      status: 500
    }));
  }

wordController.populateDatabase = async (req, res, next) => {
  const words = [];

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function sleep() {
      await timeout(90);
  }

  for (let i = 0; i < words.length; i++) {
    const values = [ words[i] ];
    const query = 'INSERT INTO possible_words (word) VALUES ($1)';
    db.query(query, values)
      .then(() => {
        console.log('Added: ' + words[i]);
      })
      .catch(err => next({
        message: 'Failed to add word: ' + words[i],
        log: err.message,
        status: 500
      }));
    await sleep();
  }
  return next();
}

module.exports = wordController;