import axios from 'axios';
import { ADD_TODO, DELETE_TODO, GET_TODOS,UPDATE_TODO,EDIT_TODO } from './types';

// Get Todos
export const getTodos = () => async dispatch => {
  try {
    const res = await axios.get('/api/todos');

    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Add Todo
export const addTodo = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/todos', formData, config);

    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
    getTodos();
  } catch (err) {
    console.log(err);
  }
};

// Delete todo
export const deleteTodo = id => async dispatch => {
  try {
    await axios.delete(`/api/todos/${id}`);

    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

//Update todo
export const updateTodo= (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/todos/${id}`, formData, config);

    dispatch({
      type: UPDATE_TODO,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Edit Todo
export const editTodo = formData => async dispatch => {
  try {
    dispatch({
      type: EDIT_TODO,
      payload: formData,
    });
  } catch (err) {
console.log(err);
  }
};
