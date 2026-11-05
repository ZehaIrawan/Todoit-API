const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = Todo = mongoose.model('todo', TodoSchema);
