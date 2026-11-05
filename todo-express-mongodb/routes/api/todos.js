const express = require('express');
const router = express.Router();
const Todo = require('../../models/Todo');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

router.post(
  '/',
  auth,
  [check('title', 'Title is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newTodo = new Todo({
        title: req.body.title,
        user: req.user.id,
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route    GET api/todos
// @desc     Get all todos
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/todos/:id
// @desc     Delete a todo
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: 'Todo not found' });
    }

    // Check user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await todo.remove();

    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    Put api/todos/:id
// @desc     Update a todo
// @access   Private
router.put(
  '/:id',
  [
    auth,
    checkObjectId('id'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('isCompleted', 'isCompleted is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const todo = await Todo.findById(req.params.id);

      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
      }
      // Check user
      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      todo.title = req.body.title;
      todo.isCompleted = req.body.isCompleted;

      await todo.save();

      res.json({ msg: 'Todo Updated' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
