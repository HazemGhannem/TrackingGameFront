import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addFavorite, fetchFavorites, removeFavorite } from '@/api/favorite';
import { PopulatedFavoriteDocument } from '@/api/types';

interface FavoritesState {
  items: PopulatedFavoriteDocument[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null,
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
      .addCase(
        fetchFavorites.fulfilled,
        (state, action: PayloadAction<PopulatedFavoriteDocument[]>) => {
          state.loading = false;
          state.items = action.payload;
        },
      )
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // addFavorite
    builder
      .addCase(addFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(
        addFavorite.fulfilled,
        (state, action: PayloadAction<PopulatedFavoriteDocument>) => {
          // avoid duplicates
          const exists = state.items.some(
            (fav) => String(fav._id) === String(action.payload._id),
          );
          if (!exists) state.items.unshift(action.payload);
        },
      )
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // removeFavorite
    builder
      .addCase(removeFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(
        removeFavorite.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (fav) => String(fav._id) !== action.payload,
          );
        },
      )
      .addCase(removeFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
