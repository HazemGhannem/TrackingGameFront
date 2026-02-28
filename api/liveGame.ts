import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILiveGame } from '@/redux/slices/types';
import { PaginatedResponse } from '@/types/api/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const getLiveGames = createAsyncThunk<
  PaginatedResponse<ILiveGame>,
  { page?: number; limit?: number },
  { rejectValue: string }
>(
  'liveGame/fetchLiveGames',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axios.get<PaginatedResponse<ILiveGame>>(
        `${API_URL}/api/live-games?page=${page}&limit=${limit}`,
        { withCredentials: true },
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error ??
          error.response?.data?.message ??
          error.message ??
          'Network error',
      );
    }
  },
);
