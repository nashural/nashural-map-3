import { createSlice } from '@reduxjs/toolkit'

export const drawerOpenedSelector = (state: any) => state.drawer.open

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    open: true,
  },
  reducers: {
    toggleDrawer(state, action) {
      const { on } = action.payload
      if (on) {
        state.open = true
      } else {
        state.open = false
      }
    },
  },
})

export const { toggleDrawer } = drawerSlice.actions

export default drawerSlice.reducer
