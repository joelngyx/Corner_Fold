import { createSlice } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
  name: 'user-information',
  initialState: {
    value: 0,
    userId: '',
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value = state.value - 1;
    },
  },
});

export const { increment, decrement } = userInfoSlice.actions;
export default userInfoSlice.reducer;