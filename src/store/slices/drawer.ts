import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DrawerState, ToggleDrawerPayload } from '../typings'

export const drawerOpenedSelector = (state: any) => state.drawer.open

const initialState: DrawerState = {
  open: true
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleDrawer(state, action: PayloadAction<ToggleDrawerPayload>) {
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
