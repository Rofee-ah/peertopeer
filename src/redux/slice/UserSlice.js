import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    // isVendor: (state) => {
    //   state.user = state.user && { ...state.user._doc, isVendor: true };
    // },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
