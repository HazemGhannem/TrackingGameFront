import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PopulatedFavoriteDocument } from './types';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
export const fetchFavorites = createAsyncThunk<
  PopulatedFavoriteDocument[],
  string,
  { rejectValue: string }
>('favorite/fetchAll', async (userId, { rejectWithValue }) => {
    try {
      
    const res = await api.get<PopulatedFavoriteDocument[]>(
      `/api/favorites/show/${userId}`,
    );
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data?.message || 'Failed to fetch favorites',
      );
    }

    return rejectWithValue(error.message || 'Network error');
  }
});
export const addFavorite = createAsyncThunk<
  PopulatedFavoriteDocument,
  { userId: string; playerId: string },
  { rejectValue: string }
>('favorite/add', async ({ userId, playerId }, { rejectWithValue }) => {
    try {
    const res = await api.post<PopulatedFavoriteDocument>(`/api/favorites/add`, {
      userId,
      playerId,
    });

    return res.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data?.message || 'Failed to add favorite',
      );
    }

    return rejectWithValue(error.message || 'Network error');
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
    if (error.response) {
      return rejectWithValue(
        error.response.data?.message || 'Failed to remove favorite',
      );
    }

    return rejectWithValue(error.message || 'Network error');
  }
});
