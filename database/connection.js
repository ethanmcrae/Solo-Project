const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool here using the connection string above
const pool = new Pool({
  connectionString: process.env.PG_URI
});

// This will be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text, 'with values', params);
    return pool.query(text, params, callback);
  }
};
