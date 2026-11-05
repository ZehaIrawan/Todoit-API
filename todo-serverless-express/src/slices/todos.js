import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

export const initialState = {
  todos: [],
  todo: null,
  loading: true,
  error: {},
};

export const addTodo = createAsyncThunk(
  'todos/addTodoStatus',

  async (title) => {
    const body = { title: title };
    const res = await api.post(`/.netlify/functions/todo`, body);
    return res.data;
  },
);

export const removeTodo = (id) => async (dispatch) => {
  try {
    await api.delete(`/.netlify/functions/todo/${id}`);

    dispatch(removeTodoSuccess(id));
  } catch (error) {
    console.log(error);
  }
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodos: (state) => {
      state.loading = true;
    },
    getTodosSuccess: (state, { payload }) => {
      state.todos = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getTodosFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    addTodoSuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    },
    removeTodoSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.todos = state.todos.filter((todo) => todo._id !== payload);
    },
    updateTodoSuccess: (state, { payload }) => {
      state.todos = state.todos.map((item) => {
        if (item._id === payload.id) {
          return {
            ...item,
            title: payload.title,
            isCompleted: payload.isCompleted,
          };
        }
        return item;
      });
      state.loading = false;
      state.hasErrors = false;
    },
  },
  extraReducers: {
    [addTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
  },
});

export const {
  getTodos,
  getTodosSuccess,
  getTodosFailure,
  addTodoSuccess,
  addTodos,
  updateTodoSuccess,
  removeTodoSuccess,
} = todosSlice.actions;

export const TodosSelector = (state) => state.todos;

export default todosSlice.reducer;

export const fetchTodos = () => async (dispatch) => {
  dispatch(getTodos());
  try {
    const res = await api.get(`/.netlify/functions/todo`);

    dispatch(getTodosSuccess(res.data));
  } catch (error) {
    dispatch(getTodosFailure());
  }
};

export const updateTodo = (id, title, isCompleted) => async (dispatch) => {
  const body = { title, isCompleted };
  try {
    const res = await api.put(`/.netlify/functions/todo/${id}`, body);

    const params = { id, title, isCompleted };
    dispatch(updateTodoSuccess(params));
  } catch (error) {
    console.log(error);
  }
};
