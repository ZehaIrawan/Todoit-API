import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, getTodos } from '../actions/todo';
import TodoItem from './TodoItem';

const Todo = ({ todos, getTodos, loading, addTodo, deleteTodo }) => {
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const [formData, setFormData] = useState({
    title: '',
    completed: false,
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { title } = formData;

  const handleSubmit = e => {
    e.preventDefault();
    addTodo(formData);
    setFormData({ ...formData,title: '' });
  };

  if (loading) {
    return (
      <Fragment>
        <p>Loading ...</p>
      </Fragment>
    );
  }

  return (
    <div className="box-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" id="titleLabel">
          <input
            type="text"
            name="title"
            id="title"
            className="input-style"
            onChange={e => onChange(e)}
            value={title}
            placeholder="Enter a task..."
            required
          />
        </label>

        <button className="theme-button" type="submit">Add Task</button>
      </form>

      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          date={todo.date}
          deleteTodo={deleteTodo}
          id={todo.id}
          completed={todo.completed}
          handleCheck={e => {
            todo.completed = !todo.completed;
          }}
        />
      ))}
    </div>
  );
};
Todo.propTypes = {
  getTodos: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todos: state.todos.todos,
  loading: state.todos.loading,
});

export default connect(mapStateToProps, { getTodos, addTodo, deleteTodo })(
  Todo,
);
