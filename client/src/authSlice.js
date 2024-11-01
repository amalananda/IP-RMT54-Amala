// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    username: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.username = action.payload.username
    },
    addUserName: (state, action) => {
      state.isLoggedIn = true
      state.username = action.payload
    }
  },
})

export const { login, addUserName } = authSlice.actions

export default authSlice.reducer
