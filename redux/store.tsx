import { combineReducers, configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/NotificationSlice';
import authReducer from './slices/authSlice';
import playerReducer from './slices/riotSlice';
import favoriteReducer from './slices/favoriteSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
  riot: playerReducer,
  favorite: favoriteReducer,
});

export function store() {
  return configureStore({
    reducer: rootReducer,  
  });
}

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
