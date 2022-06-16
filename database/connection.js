const { Pool } = require('pg');

const PG_URI = process.env.PG_URI;

// Create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// This will be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
