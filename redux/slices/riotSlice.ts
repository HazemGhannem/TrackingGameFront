import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchChallengers, playerSearch } from '@/api/riot';
import { ChallengerPlayer, PlatformRegion, PlayerProfile } from '@/types/api/types';

interface PlayerState {
  profile: PlayerProfile | null;
  loading: boolean;
  error: string | null;
  challenger: {
    players: ChallengerPlayer[];
    platform: PlatformRegion;
    loading: boolean;
    error: string | null;
  };
}

const initialState: PlayerState = {
  profile: null,
  loading: false,
  error: null,
  challenger: {
    players: [],
    platform: 'euw1',
    loading: false,
    error: null,
  },
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
    setPlatform: (state, action: PayloadAction<PlatformRegion>) => {
      state.challenger.platform = action.payload;
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
    builder
      .addCase(fetchChallengers.pending, (state) => {
        state.challenger.loading = true;
        state.challenger.error = null;
      })
      .addCase(
        fetchChallengers.fulfilled,
        (state, action: PayloadAction<ChallengerPlayer[]>) => {
          state.challenger.loading = false;
          state.challenger.players = action.payload;
        },
      )
      .addCase(fetchChallengers.rejected, (state, action) => {
        state.challenger.loading = false;
        state.challenger.error =
          action.payload ?? action.error.message ?? 'Something went wrong';
      });
  },
});

export const { resetPlayer, setPlatform } = playerSlice.actions;
export default playerSlice.reducer;
