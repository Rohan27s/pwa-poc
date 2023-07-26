import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

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

const persistConfig = {
  key: 'root', // key for the root of the storage
  storage, // storage to use (e.g., localStorage)
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

 const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // use the persisted auth reducer
  },
});

const persistor = persistStore(store);

export const { login, logoutUser } = authSlice.actions;
export { store, persistor };
