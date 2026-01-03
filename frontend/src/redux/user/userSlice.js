import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  errorDispatch: null,
  loading: false

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers :{
    signinStart: (state) => {
      state.loading = true;   
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.errorDispatch = null;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.errorDispatch = action.payload;
    },

    signoutStart: (state) => {
      state.loading = true;   
    },
    signoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.errorDispatch = null;
    },
    signoutFailure: (state, action) => {
      state.loading = false;
      state.errorDispatch = action.payload;
    },
  
  }
});

export const { signinStart, signInSuccess, signinFailure, signoutStart, signoutSuccess, signoutFailure } = userSlice.actions;

export default userSlice.reducer;