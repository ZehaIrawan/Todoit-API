import { combineReducers } from 'redux';
import authReducer from './auth';
import todosReducer from './todos';

const rootReducer = combineReducers({
  todos: todosReducer,
  auth: authReducer,
});

export default rootReducer;
