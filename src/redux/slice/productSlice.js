import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    productItems: null
  },
  reducers: {
    addProduct: (state, action) => {
      state.productItems = action.payload
    }
  },
})

export const { addProduct } = productSlice.actions

export default productSlice.reducer