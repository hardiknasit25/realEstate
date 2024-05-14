import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
    }
  }
})

export const { signinSuccess, signinFailure, signOutSuccess, signOutFailure } = userSlice.actions;

export default userSlice.reducer;