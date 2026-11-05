const express = require('express');
const { pool } = require('./config');
const router = express.Router();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/todos', require('./routes/api/todos'));

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening`);
});
