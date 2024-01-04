const express = require('express');

const db = require('./data/database');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return currentDate.toLocaleDateString('en-US', options);
}

app.get('/', (req, res) => {
  db.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      throw error;
    }
    res.render('index', { currentDate: getCurrentDate(), tasks: results });
  });
});

app.post('/addTask', (req, res) => {
  const newTask = req.body.task;
  if (newTask.trim() !== '') {
    db.query('INSERT INTO tasks (task) VALUES (?)', [newTask], (error) => {
      if (error) {
        throw error;
      }
      res.redirect('/');
    });
  }
});

app.post('/removeTask', (req, res) => {
  const indexToRemove = req.body.index;
  db.query('DELETE FROM tasks WHERE id = ?', [indexToRemove], (error) => {
    if (error) {
      throw error;
    }
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
