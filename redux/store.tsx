import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import playerReducer from './slices/riotSlice';
import favoriteReducer from './slices/favoriteSlice';
import liveGameReducer from './slices/LiveGameSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  riot: playerReducer,
  favorite: favoriteReducer,
  liveGame: liveGameReducer,
});

export function store() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
