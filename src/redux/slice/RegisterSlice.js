import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    account: null,
  },
  reducers: {
    addAccount: (state, action) => {
      state.account = state.account
        ? { ...state.account, ...action.payload }
        : action.payload;
    },
    removeAccount: (state, action) => {
      state.account = null;
    },
  },
});

export const { addAccount, removeAccount } = registerSlice.actions;

export default registerSlice.reducer;
