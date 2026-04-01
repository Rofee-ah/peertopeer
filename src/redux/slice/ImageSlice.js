import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  images: [], 
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImages: (state, action) => {
      state.images.push(...action.payload);
    },
    removeImage: (state, action) => {
      state.images.splice(action.payload, 1);
    },
  },
});

export const { addImages, removeImage } = imageSlice.actions;
export default imageSlice.reducer;