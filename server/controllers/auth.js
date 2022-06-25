const bcrypt = require('bcryptjs');
const db = require('../../database/connection.js');

const authController = {};

authController.signUp = async (req, res, next) => {
  // Reference new user login data from the client's form request
  const { email, pass, first, last, subscribed } = req.body;

  // Encrypt password with a salt factor of 5
  const hash = await bcrypt.hash(pass, 5);

  // Create a timestamp
  const since = Date.now();

  // Ready to register the new user in the database
  const values = [ email, hash, first, last, since, subscribed ];
  const query = 'INSERT INTO logins (email, pass, first, last, since, subscribed) VALUES ($1, $2, $3, $4, $5, $6)';

  db.query(query, values)
    .then(() => {
      res.locals.valid = true;
      // Continue to next middleware
      return next();
    })
    .catch(err => {
      // User already exists error
      if (err.message === 'duplicate key value violates unique constraint "logins_email_key"') {
        res.locals.valid = false;
        res.locals.message = 'Email already exists';
        return next();
      }
      // Other error
      else return next({
        // Return error response to client
        message: 'Failed to create login.',
        log: err.message,
        status: 500
      })}
    );
}

authController.signIn = (req, res, next) => {
  // Reference user signin data from the client's form request
  const { email, pass, remember } = req.body;

  // Search database for matching user
  const values = [ email ];
  const query = 'SELECT user_id, pass FROM logins WHERE email = $1'
  db.query(query, values)
    .then(async (data) => {
      // If a user doesn't exist: respond with an invalid login response
      if (!data.rows[0]) res.locals.valid = false;
      // If the user does exist
      else {
        // Destructure hash and id from the database response
        const { pass: hash, user_id } = data.rows[0]; 
        // Log
        console.log('Data ->', data.rows[0]);
        console.log('Finding user ->', user_id);
        // Validate the password
        const valid = await bcrypt.compare(pass, hash);
        // Assign the bcrypt comparison as the validity response
        res.locals.valid = valid;
        // If the signin was successful
        if (valid) {
          // Create cookie settings
          const settings = { httpOnly: true };
          if (!remember) settings.expires = new Date(Date.now() + 3600000); // Only save login for 1 hour if remember is false
          // Set session cookie
          res.cookie('id', user_id, settings);
        }
      }
      // Continue to the next middleware
      return next();
    })
    .catch(err => next({
      // Return error response to client
      message: 'Failed to verify login.',
      log: err.message,
      status: 500
    }));
}

authController.validate = (req, res, next) => {
  const { id } = req.cookies;
  if (id) {
    console.log('Verified id:', id);
    res.locals.valid = true;
  }
  else {
    console.log('Redirecting...');
    res.locals.valid = false;
  }
  return next();
}

authController.setCookie = (req, res, next) => {
  res.cookie('email', 'ert67dy7@gmail.com', { expires: new Date(Date.now() + 900000), httpOnly: true });
  console.log('Set cookie');
  return next();
}

module.exports = authController;
