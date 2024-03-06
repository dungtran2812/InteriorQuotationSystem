import { createSlice } from "@reduxjs/toolkit"

// Define the initial state using that type
const initialState = {
  authenticated: false,
  user: null
}

export const currenUserSlice = createSlice({
  name: "currentUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: state => {
      state.authenticated = true
    },
    logout: state => {
      state.authenticated = false
    },
    updateUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { login, logout, updateUser } = currenUserSlice.actions

export default currenUserSlice.reducer
