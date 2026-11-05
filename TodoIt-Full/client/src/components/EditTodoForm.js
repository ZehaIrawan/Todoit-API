import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTodo } from '../actions/todo';

const EditTodoForm = ({ todo, updateTodo }) => {
  const [formData, setFormData] = useState({
    title: todo.title,
    completed: todo.completed,
  });

  let [isChecked, toggleChange] = useState(false);

  const { title, completed } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    updateTodo(todo.id, formData);
  };

  toggleChange = () => {
    isChecked = !isChecked;
  };

  return (
    <form className="popForm" onSubmit={handleSubmit}>
      <label htmlFor="title" id="titleLabel">
        <input
          type="text"
          name="title"
          id="title"
          onChange={e => onChange(e)}
          value={title}
          placeholder="Enter a task"
          required
        />
      </label>
      <label>
        <input type="checkbox" checked={completed} onChange={toggleChange} />
      </label>

      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

const mapStateToProps = state => ({
  todo: state.todos.todo[0],
});

export default connect(mapStateToProps, { updateTodo })(EditTodoForm);
