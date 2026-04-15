import { createSlice } from "@reduxjs/toolkit";

export const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendor: null,
  },
  reducers: {
    setVendor: (state, action) => {
      state.vendor = action.payload;
    },
    removeVendor: (state) => {
      state.vendor = null;
    },
    updateVendor: (state, action) => {
      state.vendor = state.vendor && {
        ...state.vendor,
        listing: action.payload,
      };
    },
    // removeVendor: (state) => {
    //     state.vendor = state.user && { ...state.user._doc, isVendor: true };
    // },
  },
});

export const { setVendor, removeVendor, updateVendor } = vendorSlice.actions;

export default vendorSlice.reducer;
