import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginData, SignUpData, User, authResponse } from '../types/api/types';
import { api } from './axiosInstance';

export const signupUser = createAsyncThunk<
  authResponse,
  SignUpData,
  { rejectValue: string }
>('auth/signup', async (data: SignUpData, { rejectWithValue }) => {
  try {
    const response = await api.post<authResponse>(`/api/auth/signup`, data);
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
    const response = await api.post<authResponse>(`/api/auth/login`, data);
    const { token, user } = response.data;
    // saveTokenCookie(token);
    return user;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.error) {
      return rejectWithValue(err.response.data.error);
    }
    return rejectWithValue(err.message || 'login failed');
  }
});
// export const logoutUser = createAsyncThunk<void, void>(
//   'auth/logout',
//   async () => {
//     // clearTokenCookie();
//   },
// );
export const logoutUser = createAsyncThunk<void, void>(
  'auth/logout',
  async () => {
    await api.post('/api/auth/logout'); // ✅ backend clears the cookie
  },
);
// function saveTokenCookie(token: string) {
//   document.cookie = `${COOKIE_NAME}=${token};Max-Age=${MAX_AGE};Path=/;SameSite=None;Secure`;
// }

// function clearTokenCookie() {
//   document.cookie = `${COOKIE_NAME}=;Max-Age=0;Path=/;SameSite=None;Secure`;
// }
