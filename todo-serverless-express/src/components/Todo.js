import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos, removeTodo, updateTodo } from '../slices/todos';

const Todo = () => {
  const [todo, setTodo] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  const loading = useSelector((state) => state.todos.loading);
  let todos = useSelector((state) => state.todos.todos);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  let todosByDate = todos
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h3>
        “When you talk, you are only repeating what you already know. But if you
        listen, you may learn something new.”Dalai Lama{' '}
      </h3>
      <input
        type="text"
        placeholder="What is your main focus today?"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch(addTodo(todo));
          setTodo('');
        }}
      >
        Add todo
      </button>
      <ul className="todolist-container">
        {todosByDate.map((todo) => {
          return (
            <li key={todo._id}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() =>
                  dispatch(updateTodo(todo._id, todo.title, !todo.isCompleted))
                }
              ></input>
              <p
                style={
                  todo.isCompleted ? { textDecoration: 'line-through' } : null
                }
              >
                {todo.title}
              </p>
              <button
                onClick={() => {
                  dispatch(removeTodo(todo._id));
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
