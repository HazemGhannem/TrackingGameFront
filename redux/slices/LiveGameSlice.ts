import { createSlice } from '@reduxjs/toolkit';
import { PaginationMeta } from './types';
import { getLiveGames } from '@/api/liveGame';

interface LiveGameState {
  activeGames: any;
  pagination: PaginationMeta;

  loading: boolean;
  hasFetched: boolean;
  error: string | null;
}

const initialState: LiveGameState = {
  activeGames: {},
  loading: false,
  hasFetched: false,
  pagination: { page: 1, pages: 1, total: 0 },
  error: null,
};

const liveGameSlice = createSlice({
  name: 'liveGame',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLiveGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLiveGames.fulfilled, (state, action) => {
        state.loading = false;
        state.activeGames = action.payload.data;
        state.hasFetched = true;
        state.pagination = {
          page: action.meta.arg.page ?? 1,
          pages: action.payload.pages,
          total: action.payload.total,
        };
      })
      .addCase(getLiveGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch live games';
      });
  },
});

export const {} = liveGameSlice.actions;
export default liveGameSlice.reducer;
