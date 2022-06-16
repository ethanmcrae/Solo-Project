const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const word = require('./controllers/word');

app.use(express.json());

app.get('/', (req, res) => (
  res.status(200).sendFile(path.join(__dirname, 'index.html'))
));

app.get('/word', word.get, (req, res) => (
  res.status(200).json(res.locals.word)
));

app.post('/', word.post, (req, res) => (
  res.sendStatus(200)
));

app.delete('/', (req, res) => (
  res.sendStatus(200)
))

app.use((err, req, res, next) => {
  console.log(err.log);
  return res.status(err.status || 500).json(err.message);
});

app.listen(port, () => {
  console.log(`Wordle eX listening on port ${port}`);
})