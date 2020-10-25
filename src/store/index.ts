import { configureStore } from '@reduxjs/toolkit'
import groups from './groups'
import map from './map'
import modal from './modal'
import router from './router'
import drawer from './drawer'

export const store = configureStore({
  reducer: {
    groups,
    map,
    modal,
    router,
    drawer
  }
})
