import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import citizensReducer from './slices/citizensSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    citizens: citizensReducer,
  },
});
