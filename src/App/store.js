import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/AuthSlice';
import themeReducer from '../Features/Theme/themeSlice';
import searchReducer from '../Features/Search/Searchslice';
import toggleSidebarReducer from '../Features/ToggleSideBar/ToggleSidebarSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    theme: themeReducer,
    search: searchReducer,
    toggleSidebar: toggleSidebarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
