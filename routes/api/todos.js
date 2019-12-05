const express = require('express');
const router = express.Router();
const { pool } = require('../../config');

// Add todo
router.post('/', (req, res) => {
  const { title, completed } = req.body;

  pool.query(
    'INSERT INTO todos (title,completed) VALUES ($1, $2) RETURNING *',
    [title, completed],
    (error, results) => {
      if (error) {
        console.log(error);
      }

          res.status(200).json(results.rows[0]);
    },
  );
});

//Get all todos
router.get('/', (req, res) => {
  pool.query('SELECT * FROM todos ORDER BY id DESC', (error, results) => {
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
  });
  pool.query('SELECT * FROM todos', (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send(results.rows);
  });
});

// Update todo by id
router.put('/:id', (req, res) => {
  const id = req.params.id;

  const data = {
    title: req.body.title,
    completed: !req.body.completed,
  };

  pool.query(
    'UPDATE todos SET title=($1), completed=($2) WHERE id=($3)',
    [data.title, data.completed, id],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      pool.query(
        'SELECT * FROM todos WHERE id=($1)',
        [id],
        (error, results) => {
          if (error) {
            console.log(error);
          }
          res.status(200).json(results);
        },
      );
    },
  );
});

module.exports = router;
