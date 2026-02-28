// api/riot.ts
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlayerProfile, ChallengerPlayer, PlatformRegion } from '../types/api/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const playerSearch = createAsyncThunk<
  PlayerProfile,
  { name: string; tag: string; region: string },
  { rejectValue: string }
>('player/fetchPlayer', async ({ name, tag, region }, { rejectWithValue }) => {
  try {
    const res = await axios.get<PlayerProfile>(
      `${API_URL}/api/riot/player/${region}/${name}/${tag}`,
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
    const res = await axios.get<{ players: ChallengerPlayer[] }>(
      `${API_URL}/api/riot/player/challenger/${platform}`,
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