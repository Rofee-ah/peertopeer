import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: null
  },
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    },
    removeCount: (state) => {
        state.count = 0
    }
  },
})

export const { increment, decrement, incrementByAmount, removeCount } = counterSlice.actions

export default counterSlice.reducer