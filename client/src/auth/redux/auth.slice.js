import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'counter',
  initialState: {
    user: null,
    isLoading: false,
    isError: null
  },
  reducers: {
    loginUser: (state, action) => {
        console.log('slice', action.payload)
        state.user = action.payload
    }
  }
})


export const { loginUser } = loginSlice.actions
export default loginSlice.reducer