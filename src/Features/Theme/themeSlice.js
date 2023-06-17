import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,

  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.darkMode;

export default themeSlice.reducer;
