import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

// Slice
const slice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.loading = false;
      localStorage.setItem('token', action.payload);
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.token = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.setItem('token', null);
    },
  },
});

export default slice.reducer;

// Actions
const { loginSuccess, logoutSuccess, userLoaded } = slice.actions;

export const login = ({ email, password }) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/.netlify/functions/auth/signin', body);
    dispatch(loginSuccess(res.data.token));
  } catch (e) {
    return console.error(e.message);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/.netlify/functions/users');
    dispatch(userLoaded(res.data));
  } catch (e) {}
};

export const logout = () => async (dispatch) => {
  try {
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
