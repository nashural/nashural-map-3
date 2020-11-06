import { GeoJSONCoordinates, GeoJSONFeature } from '../../typings.d'
import { Route } from '../../typings.d'

export interface MapProps {}

export interface RouteProps {
  ymaps?: any // TODO: Specific type
  mapRef: any // TODO: Specific type
  points: GeoJSONCoordinates[]
}

export interface RouteManagerCache {
  [key: string]: any
}

export interface MobileMapProps {
  center: GeoJSONCoordinates
  zoom: number
  features: GeoJSONFeature[]
  routes: Route[]
  renderPlacemark: (value: GeoJSONFeature, index: number, array: GeoJSONFeature[]) => {}
  onBoundsChange: Function
}

export interface DesktopMapProps {
  center: GeoJSONCoordinates
  zoom: number
  features: GeoJSONFeature[]
  routes: Route[]
  renderPlacemark: (value: GeoJSONFeature, index: number, array: GeoJSONFeature[]) => {}
  onBoundsChange: Function
}
