import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobview: false,
  lgView: true,
};

export const toggleSidebarSlice = createSlice({
  name: 'toggleSidebar',
  initialState,

  reducers: {
    toggleMobView: (state) => {
      state.mobview = !state.mobview;
    },
    toggleLgView: (state) => {
      state.lgView = !state.lgView;
    },
  },
});

export const { toggleMobView, toggleLgView } = toggleSidebarSlice.actions;

export const selectMobView = (state) => state.toggleSidebar.mobview;
export const selectLgView = (state) => state.toggleSidebar.lgView;

export default toggleSidebarSlice.reducer;
