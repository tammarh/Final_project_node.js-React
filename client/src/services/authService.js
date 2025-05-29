/*import api from './api'


export const login = async (userName, password) => {
    const response = await api.post('/auth/login', { username: userName, password })
    return response.data
}

export const register = async (user) => {
    const response = await api.post('/auth/register', user);
    return response.data;
};*/

// src/features/auth/authSlice.js
/*import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage || null,
    user: null,
    role:"",
},
  reducers: {
    setCredentials: (state, action) => {
      const { token, user , role } = action.payload;
      state.token = token;
      state.user = user;
      state.role = role;
      localStorage.setItem('token', token); // שומר בלוקאל
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;*/
