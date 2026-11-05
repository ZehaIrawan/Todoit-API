import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from '../actions/types';

const initialState = {
  todos: [],
  todo: [],
  loading: true,
  error: {},
};

const todos = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TODOS:
      return { ...state, todos: payload, loading: false };
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload),
        loading: false,
      };
    case EDIT_TODO:
      console.log(payload);
      return {
        ...state,
        todo: [payload],
        loading: false,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(item => {
          // Find the item with the matching id

          if (item.id === payload.id) {
            // Return a new object

            return {
              ...item, // copy the existing item
              title: payload.title,
              completed: payload.completed,
            };
          }
          // Leave every other item unchanged

          return item;
        }),

        loading: false,
      };
    default:
      return state;
  }
};

export default todos;
