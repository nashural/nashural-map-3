import { store } from './index'

import { Group, GeoJSONFeature, GeoJSON, GeoJSONCoordinates, Route } from '../typings.d'

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export interface DrawerState {
  open: boolean
}

export interface ToggleDrawerPayload {
  on: boolean
}

export interface SelectedGroupsIndex {
  [key: string]: boolean
}

export interface GroupsIndex {
  [key: string]: GeoJSON
}

export interface GroupNamesIndex {
  [key: string]: string
}

export interface GroupsState {
  groups: GroupsIndex
  allGroups: Group[]
  selectedGroups: SelectedGroupsIndex
  activeGroups: string[]
  features: GeoJSONFeature[]
}

export interface ToggleGroupPayload {
  id: string
  on: boolean
}

export interface MapState {
  zoom: number
  center: GeoJSONCoordinates
  place: string|void
}

export interface ChangeBoundsPayload {
  center: GeoJSONCoordinates
  zoom: number
}

export interface ModalPropsIndex {
  [key: string]: object
}

export interface ModalState {
  opened: string[]
  props: ModalPropsIndex
}

export interface ToggleModalPayload {
  on: boolean
  name: string
  props: object
}

export interface RouterState {
  routes: Route[]
  open: boolean
}

export interface ToggleRouterPayload {
  on: boolean
}

export interface InitRoutesPayload {
  routes: Route[]
}

export interface ReorderRoutesPayload {
  fromIdx: number
  toIdx: number
}

export interface AppendRoutePayload {
  route: Route
}

export interface RemoveRoutePayload {
  index: number
}

export interface RouteSetCoordinatesPayload {
  index: number
  coordinates: GeoJSONCoordinates
}
