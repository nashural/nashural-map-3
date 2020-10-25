import { createSlice } from '@reduxjs/toolkit'

export const routesSelector = (state: any) => state.router.routes

export const routerOpenedSelector = (state: any) => state.router.open

const routerSlice = createSlice({
  name: 'router',
  initialState: {
    routes: [],
    open: false
  },
  reducers: {
    toggleRouter(state, action) {
      const { on } = action.payload
      if (on) {
        state.open = true
      } else {
        state.open = false
      }
    },
    initRoutes(state, action) {
      const { routes } = action.payload
      state.routes = routes
    },
    reorderRoutes(state, action) {
      const { fromIdx, toIdx } = action.payload
      const [route] = state.routes.splice(fromIdx, 1)
      state.routes.splice(toIdx, 0, route)
    },
    appendRoute(state, action) {
      const { route } = action.payload
      // @ts-ignore
      state.routes.push(route)
    },
    removeRoute(state, action) {
      const { index } = action.payload
      state.routes.splice(index, 1)
    },
    routeSetCoordinates(state, action) {
      const { index, coordinates } = action.payload
      // @ts-ignore
      state.routes[index].coordinates = coordinates
    }
  },
  
})

export const {
  initRoutes,
  reorderRoutes,
  appendRoute,
  removeRoute,
  routeSetCoordinates,
  toggleRouter
} = routerSlice.actions

export default routerSlice.reducer
