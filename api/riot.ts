import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlayerProfile } from './types';

const API_URL = 'http://localhost:5000';

export const playerSearch = createAsyncThunk<
  PlayerProfile,
  { name: string; tag: string },
  { rejectValue: string }
>('player/fetchPlayer', async ({ name, tag }, { rejectWithValue }) => {
  try {
    const res = await axios.get<PlayerProfile>(
      `${API_URL}/api/riot/player/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
      {
        withCredentials: true,  
      },
    );

    return res.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data?.error ||
          error.response.data?.message ||
          'Server error',
      );
    }

    return rejectWithValue(error.message || 'Network error');
  }
});
