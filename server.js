const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data/scores.json');

// Inzending opslaan
app.post('/submit', (req, res) => {
  const score = req.body;
  let scores = [];

  if (fs.existsSync(DATA_FILE)) {
    scores = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  scores.push(score);
  fs.writeFileSync(DATA_FILE, JSON.stringify(scores, null, 2));
  res.status(200).send({ message: 'Score ontvangen, bedankt!' });
});

// Resultaten ophalen
app.get('/results', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
