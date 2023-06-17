import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  role: null,
  user: null,
  classAssigned: null,
  classId: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;

      const token = accessToken;
      const decodeToken = jwtDecode(token);
      const role = decodeToken.access.role;
      const classAssigned = decodeToken.access.classAssigned;
      const user = decodeToken.username;

      state.token = token;
      state.role = role;
      state.user = user;
      state.classAssigned = classAssigned;
    },
    setClass: (state, action) => {
      const classId = action.payload;
      state.classId = [classId];
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.classAssigned = null;
      state.classId = 0;
    },
  },
});

export const { setCredentials, logout, setClass } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentClassAssigned = (state) => state.auth.classAssigned;
export const selectCurrentClassId = (state) => state.auth.classId;

export default authSlice.reducer;
