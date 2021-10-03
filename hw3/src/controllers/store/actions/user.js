import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const AUTO_LOGIN = 'AUTO_LOGIN';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const userAutoLogin = createAsyncThunk(AUTO_LOGIN, async () => {
  const user = await axios.get('/api/user/1');
  return { user: user.data };
});

export const userLogin = createAsyncThunk(LOGIN_USER, async ({ id = 1 }) => {
  const user = await axios.get(`/api/user/${id}`);
  await axios.put('/api/user/1', { ...user, logged_in: true });
  return { user: user.data };
});

export const userLogout = createAsyncThunk(
  LOGOUT_USER,
  async (_, { getState }) => {
    console.log('logout');
    const { currentUser } = getState();
    await axios.put('/api/user/1', { ...currentUser, logged_in: false });
  }
);
