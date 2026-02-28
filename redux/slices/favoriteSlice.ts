import { createSlice } from '@reduxjs/toolkit';
import {
  addFavorite,
  fetchFavoriteIds,
  fetchFavorites,
  removeFavorite,
} from '@/api/favorite';
import { PopulatedFavoriteDocument } from '@/types/api/types';
import { PaginationMeta } from './types';

interface FavoritesState {
  items: PopulatedFavoriteDocument[];
  pagination: PaginationMeta;
  loading: boolean;
  hasFetched: boolean;
  error: string | null;
  favoriteIds: string[];
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  pagination: { page: 1, pages: 1, total: 0 },
  error: null,
  hasFetched: false,
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchFavorites
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.hasFetched = true;
        state.items = action.payload.data;
        state.pagination = {
          page: action.meta.arg.page ?? 1,
          pages: action.payload.pages,
          total: action.payload.total,
        };
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // addFavorite
    builder
      .addCase(addFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        // avoid duplicates
        const exists = state.items.some(
          (fav) => String(fav._id) === String(action.payload._id),
        );
        state.pagination.total += 1;
        state.hasFetched = false;
        if (!exists) state.items.unshift(action.payload);
        const newId = String(action.payload.playerId._id);
        if (!state.favoriteIds.includes(newId)) {
          state.favoriteIds.push(newId);
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // removeFavorite
    builder
      .addCase(removeFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.pagination.total -= 1;
        state.hasFetched = false;

        state.items = state.items.filter(
          (fav) => String(fav._id) !== action.payload.favoriteId,
        );
        state.favoriteIds = state.favoriteIds.filter(
          (id) => id !== action.payload.playerId,
        );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
    //ids
    builder.addCase(fetchFavoriteIds.fulfilled, (state, action) => {
      state.favoriteIds = action.payload;
    });
  },
});

export const { clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
