// api/riot.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  PlayerProfile,
  ChallengerPlayer,
  PlatformRegion,
} from '../types/api/types';
import { api } from './axiosInstance';

export const playerSearch = createAsyncThunk<
  PlayerProfile,
  { name: string; tag: string; region: string },
  { rejectValue: string }
>('player/fetchPlayer', async ({ name, tag, region }, { rejectWithValue }) => {
  try {
    const res = await api.get<PlayerProfile>(
      `/riot/player/${region}/${name}/${tag}`,
      { withCredentials: true },
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

export const fetchChallengers = createAsyncThunk<
  ChallengerPlayer[],
  PlatformRegion,
  { rejectValue: string }
>('player/challenger', async (platform, { rejectWithValue }) => {
  try {
    const res = await api.get<{ players: ChallengerPlayer[] }>(
      `/riot/player/challenger/${platform}`,
      { withCredentials: true },
    );
    return res.data.players;
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
