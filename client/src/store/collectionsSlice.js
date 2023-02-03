import { createSlice } from '@reduxjs/toolkit'

export const collectionsSlice = createSlice({
  name: 'user-collections',
  initialState: {
    value: [],
  },
  reducers: {
    addCollection: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    decrement: (state) => {
      state.value = state.value - 1;
    },
  },
});

export const { addCollection, decrement } = collectionsSlice.actions;
export default collectionsSlice.reducer;