const express = require('express');
const router = express.Router();
const models = require('../models');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  [check('firstName', 'firstName is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName } = req.body;
    try {
      const user = await models.User.create({ firstName });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
