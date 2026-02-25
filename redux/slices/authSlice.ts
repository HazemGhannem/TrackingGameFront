import { loginUser, logoutUser, signupUser } from '@/api/auth';
import { createSlice } from '@reduxjs/toolkit';
import { authState } from './types';

const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }
  return null;
};
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    success: false,
    error: null,
    user: getInitialUser() ,
  } as authState,
  reducers: {
    resetSignup: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.success = false;
        state.user = null;
        state.error = null;
        localStorage.removeItem('user');
      });
  },
});

export const { resetSignup } = authSlice.actions;
export default authSlice.reducer;
