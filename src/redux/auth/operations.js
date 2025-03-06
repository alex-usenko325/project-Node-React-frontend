import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const authAPI = axios.create({
  baseURL: 'http://localhost:5000', // Вкажіть правильний порт вашого серверу
});

// Додавання та очищення заголовку авторизації
const setAuthHeader = token => {
  authAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  authAPI.defaults.headers.common.Authorization = '';
};

// Реєстрація
export const signup = createAsyncThunk(
  'auth/signup',
  async (body, thunkAPI) => {
    try {
      const response = await authAPI.post('/auth/signup', body);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Логін
export const signin = createAsyncThunk(
  'auth/signin',
  async (body, thunkAPI) => {
    try {
      const response = await authAPI.post('/auth/signin', body);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Логаут
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authAPI.post('/auth/logout');
    clearAuthHeader();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Оновлення токена користувача
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    try {
      const response = await authAPI.get('/auth/refresh');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Отримання даних користувача
export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, thunkAPI) => {
    try {
      const response = await authAPI.get('/user/profile');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
