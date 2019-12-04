const express = require('express');
const router = express.Router();
const { pool } = require('../../config');

// Add todo
router.post('/', (request, response) => {
  const { title, date } = request.body;

  pool.query(
    'INSERT INTO todos (title, date) VALUES ($1, $2)',
    [title, date],
    error => {
      if (error) {
        res.status(500).send('Server Error');
      }
      response.status(201).json({ status: 'success', message: 'Todo added.' });
    },
  );
});

//Get all todos
router.get('/', (req, res) => {
  pool.query('SELECT * FROM todos', (error, results) => {
    if (error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
  });
});

// Delete todo by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  pool.query('DELETE FROM todos WHERE id=($1)', [id], error => {
    if (error) {
      console.log(error);
    }
    res.status(201).json({ status: 'success', message: 'Todo deleted.' });
  });
});

module.exports = router;
