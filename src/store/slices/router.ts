import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  RootState,
  RouterState,
  ToggleRouterPayload,
  InitRoutesPayload,
  ReorderRoutesPayload,
  AppendRoutePayload,
  RemoveRoutePayload,
  RouteSetCoordinatesPayload,
  RouteInfo
} from '../typings.d'
import { GeoJSONCoordinates } from '../../typings.d'

const routeGetCoordinates = ({ coordinates }: { coordinates: GeoJSONCoordinates }): GeoJSONCoordinates => coordinates

export const routesSelector = (state: RootState) => state.router.routes

export const routerOpenedSelector = (state: RootState) => state.router.open

export const routeInfoSelector = (state: RootState) => state.router.info

export const pointsSelector = (state: RootState): GeoJSONCoordinates[]|undefined => {
  const { routes } = state.router
  if (routes && routes.length >= 2) {
    return routes.map(routeGetCoordinates)
  }
  return undefined
}

const initialState: RouterState = {
  routes: [],
  open: false,
  info: {
    show: false
  }
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
    },
    toggleInfo(state, action: PayloadAction<RouteInfo>) {
      const { show, humanTime, humanJamsTime, humanLength, humanFuel } = action.payload
      if (show) {
        state.info.show = true
        state.info.humanTime = humanTime
        state.info.humanJamsTime = humanJamsTime
        state.info.humanLength = humanLength
        state.info.humanFuel = humanFuel
      } else {
        state.info.show = false
        delete state.info.humanTime
        delete state.info.humanJamsTime
        delete state.info.humanLength
        delete state.info.humanFuel
      }
    }
  }
})

export const {
  initRoutes,
  reorderRoutes,
  appendRoute,
  removeRoute,
  routeSetCoordinates,
  toggleRouter,
  toggleInfo
} = routerSlice.actions

export default routerSlice.reducer
