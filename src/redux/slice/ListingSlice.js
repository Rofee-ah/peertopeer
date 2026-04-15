import { createSlice } from "@reduxjs/toolkit";

export const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listing: null,
    userListing: null,
  },
  reducers: {
    addListing: (state, action) => {
      state.listing = action.payload;
    },
    addUserListing: (state, action) => {
      state.userListing = action.payload;
    },
    removeListing: (state) => {
      state.listing = null;
    },
    updateListing: (state, action) => {
      state.listing = { ...state.listing, ...action.payload };
    },
  },
});

export const { addListing, removeListing, updateListing, addUserListing } =
  listingSlice.actions;

export default listingSlice.reducer;
