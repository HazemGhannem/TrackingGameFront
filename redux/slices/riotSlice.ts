// store/playerSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { playerSearch } from '@/api/riot';
import { PlayerProfile } from '@/api/types';

interface PlayerState {
  profile: PlayerProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlayerState = {
  profile: null,
  loading: false,
  error: null,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    resetPlayer: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(playerSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        playerSearch.fulfilled,
        (state, action: PayloadAction<PlayerProfile>) => {
          state.loading = false;
          state.profile = action.payload;
        },
      )
      .addCase(playerSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export const { resetPlayer } = playerSlice.actions;
export default playerSlice.reducer;
