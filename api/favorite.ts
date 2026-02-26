import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PopulatedFavoriteDocument } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const fetchFavorites = createAsyncThunk<
  PopulatedFavoriteDocument[],
  void,
  { rejectValue: string }
>('favorite/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<PopulatedFavoriteDocument[]>('/api/favorites/show');
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ?? error.message ?? 'Network error',
    );
  }
});

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
  string,
  { favoriteId: string },
  { rejectValue: string }
>('favorite/remove', async ({ favoriteId }, { rejectWithValue }) => {
  try {
    await api.delete(`/api/favorites/${favoriteId}`);
    return favoriteId;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ?? error.message ?? 'Network error',
    );
  }
});
