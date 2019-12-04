const express = require('express');
const { pool } = require('./config');

const app = express();

app.use(express.json({ extended: false }));

const getTodos = (request, response) => {
  pool.query('SELECT * FROM todos', (error, results) => {
    if (error) {
    console.log(error);
    }
    response.status(200).json(results.rows);
  });
};

const addTodo = (request, response) => {
  const { title, date } = request.body;

  pool.query(
    'INSERT INTO todos (title, date) VALUES ($1, $2)',
    [title, date],
    error => {
      if (error) {
        console.log(error);
      }
      response.status(201).json({ status: 'success', message: 'Todo added.' });
    },
  );
};

app
  .route('/todos')
  // GET endpoint
  .get(getTodos)
  // POST endpoint
  .post(addTodo);

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening`);
});
