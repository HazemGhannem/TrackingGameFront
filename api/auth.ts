import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginData, SignUpData, User, authResponse } from './types';
const api_url = 'http://localhost:5000';
const COOKIE_NAME = 'esports_token';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const signupUser = createAsyncThunk<
  authResponse,
  SignUpData,
  { rejectValue: string }
>('auth/signup', async (data: SignUpData, { rejectWithValue }) => {
  try {
    const response = await axios.post<authResponse>(
      `${api_url}/api/auth/signup`,
      data,
    );
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.error) {
      return rejectWithValue(err.response.data.error);
    }
    return rejectWithValue(err.message || 'Signup failed');
  }
});
export const loginUser = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: string }
>('auth/login', async (data: LoginData, { rejectWithValue }) => {
  try {
    const response = await axios.post<authResponse>(
      `${api_url}/api/auth/login`,
      data,
    );
    const { token, user } = response.data;
    saveTokenCookie(token);
    return user;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.error) {
      return rejectWithValue(err.response.data.error);
    }
    return rejectWithValue(err.message || 'login failed');
  }
});
export const logoutUser = createAsyncThunk<void, void>(
  'auth/logout',
  async () => {
    clearTokenCookie();
  },
);

function saveTokenCookie(token: string) {
  const secure = process.env.NODE_ENV === 'production' ? ';Secure' : '';
  document.cookie = `${COOKIE_NAME}=${token};Max-Age=${MAX_AGE};Path=/;SameSite=Lax${secure}`;
}

function clearTokenCookie() {
  document.cookie = `${COOKIE_NAME}=;Max-Age=0;Path=/;SameSite=Lax`;
}