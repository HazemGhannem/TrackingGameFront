import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  PaginatedResponse,
  PopulatedFavoriteDocument,
} from '../types/api/types';
import { api } from './axiosInstance';



export const fetchFavorites = createAsyncThunk<
  PaginatedResponse<PopulatedFavoriteDocument>,
  { page?: number; limit?: number },
  { rejectValue: string }
>(
  'favorite/fetchAll',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await api.get<PaginatedResponse<PopulatedFavoriteDocument>>(
        `/api/favorites/show?page=${page}&limit=${limit}`,
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? error.message ?? 'Network error',
      );
    }
  },
);

export const addFavorite = createAsyncThunk<
  PopulatedFavoriteDocument,
  { playerId: string },
  { rejectValue: string }
>('favorite/add', async ({ playerId }, { rejectWithValue }) => {
  try {
    const res = await api.post<PopulatedFavoriteDocument>(
      '/api/favorites/add',
      { playerId },
    );
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ?? error.message ?? 'Network error',
    );
  }
});

export const removeFavorite = createAsyncThunk<
  { favoriteId: string; playerId: string },
  { favoriteId: string; playerId: string },
  { rejectValue: string }
>('favorite/remove', async ({ favoriteId, playerId }, { rejectWithValue }) => {
  try {
    await Promise.all([
      api.delete(`/api/favorites/${favoriteId}`),
      api.delete(`/api/live-games/delete/${playerId}`),
    ]);
    return { favoriteId, playerId };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ?? error.message ?? 'Network error',
    );
  }
});
export const fetchFavoriteIds = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('favorite/fetchIds', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<{ ids: string[] }>('/api/favorites/ids');
    return res.data.ids;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message ?? 'Network error');
  }
});
