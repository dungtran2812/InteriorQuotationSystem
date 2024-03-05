import { configureStore } from '@reduxjs/toolkit'
import currenUserReducer from './currenUserSlice'
export const store = configureStore({
  reducer: {
    currentUser: currenUserReducer,
  },
})