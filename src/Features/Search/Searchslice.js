import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
};
export const searchslice = createSlice({
  name: 'search',
  initialState,

  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { updateSearchTerm } = searchslice.actions;

export const setSearchTerm = (state) => state.search;

export default searchslice.reducer;
