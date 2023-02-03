import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './userInfoSlice';
import collectionsReducer from './collectionsSlice';

export default configureStore({
  reducer: {
    userInfo : userInfoReducer,
    collections : collectionsReducer
  }
})