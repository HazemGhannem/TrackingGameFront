import { combineReducers, configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/NotificationSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
});

export function store() {
  return configureStore({
    reducer: rootReducer,  
  });
}

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
