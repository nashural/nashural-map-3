import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  RootState,
  RouterState,
  ToggleRouterPayload,
  InitRoutesPayload,
  ReorderRoutesPayload,
  AppendRoutePayload,
  RemoveRoutePayload,
  RouteSetCoordinatesPayload
} from '../typings'

export const routesSelector = (state: RootState) => state.router.routes

export const routerOpenedSelector = (state: RootState) => state.router.open

const initialState: RouterState = {
  routes: [],
  open: false
}

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    toggleRouter(state, action:PayloadAction<ToggleRouterPayload>) {
      const { on } = action.payload
      if (on) {
        state.open = true
      } else {
        state.open = false
      }
    },
    initRoutes(state, action:PayloadAction<InitRoutesPayload>) {
      const { routes } = action.payload
      state.routes = routes
      state.open = true
    },
    reorderRoutes(state, action:PayloadAction<ReorderRoutesPayload>) {
      const { fromIdx, toIdx } = action.payload
      const [route] = state.routes.splice(fromIdx, 1)
      state.routes.splice(toIdx, 0, route)
    },
    appendRoute(state, action:PayloadAction<AppendRoutePayload>) {
      const { route } = action.payload
      state.open = true
      state.routes.push(route)
    },
    removeRoute(state, action:PayloadAction<RemoveRoutePayload>) {
      const { index } = action.payload
      state.routes.splice(index, 1)
    },
    routeSetCoordinates(state, action:PayloadAction<RouteSetCoordinatesPayload>) {
      const { index, name, coordinates } = action.payload
      state.routes[index].name = name
      state.routes[index].coordinates = coordinates
    }
  }
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
