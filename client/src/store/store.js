import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../auth/redux/auth.slice.js'

export default configureStore({
  reducer: {
    auth: loginSlice
  }
})