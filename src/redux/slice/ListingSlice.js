import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  category: "",
  subCategory: "",
  description: "",
  price: "",
  duration: 30,
  
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;

      // persist to localStorage
      localStorage.setItem("listing", JSON.stringify(state));
    },

    loadListing: (state) => {
      const saved = localStorage.getItem("listing");
      if (saved) {
        return JSON.parse(saved);
      }
      return state;
    },

    // update any listing field
    updateListing: (state, action) => {
      return { ...state, ...action.payload };
    },

    // reset listing when user finishes or cancels
    resetListing: () => initialState,
  },
});

export const { updateField, loadListing,  updateListing, resetListing } = listingSlice.actions;
export default listingSlice.reducer;