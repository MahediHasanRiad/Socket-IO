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
        state.user = action.payload
    }
  }
})


export const { loginUser } = loginSlice.actions
export default loginSlice.reducer