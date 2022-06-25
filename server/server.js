const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 3000;

const word = require('./controllers/word');
const auth = require('./controllers/auth');

app.use(express.json());
app.use(cookieParser());

// app.get('/', auth.validate, (req, res) => (
//   res.status(200).sendFile(path.join(__dirname, '../', 'index.html'))
// ));

app.post('/signup', auth.signUp, (req, res) => (
  res.status(200).json({ valid: res.locals.valid, message: res.locals.message }) // res.status(200).redirect(path.join(__dirname, 'account.html'))
));
app.post('/signin', auth.signIn, (req, res) => (
  res.status(200).json({ valid: res.locals.valid })
));

app.get('/validate', auth.validate, (req, res) => (
  res.status(200).json({ valid: res.locals.valid })
));
app.post('/load', word.load, (req, res) => (
  res.status(200).json(res.locals)
));

app.post('/', word.exists, word.check, (req, res) => (
  res.status(res.locals.status).json(res.locals.wordStatus || [])
));

app.post('/stats', word.statistics, (req, res) => (
  res.status(200).json(res.locals.words)
))

app.post('/new-word', word.post, (req, res) => (
  res.sendStatus(200)
))

app.delete('/', (req, res) => (
  res.sendStatus(200)
))

app.get('/admin', word.populateDatabase, (req, res) => (
  res.sendStatus(200)
))

// 404 Handler
app.use('*', (req, res) => (
  res.status(404).send('Not Found')
));

// Error Handler
app.use((err, req, res, next) => {
  console.log('Error Log ->', err.log);
  return res.status(err.status || 500).json(err.message);
});

app.listen(port, () => {
  console.log(`Wordle xE listening on port ${port}`);
})