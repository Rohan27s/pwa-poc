// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // Add other reducers here if needed
  },
});

export const { login, logoutUser } = authSlice.actions;
export default store;
