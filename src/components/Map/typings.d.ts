import { GeoJSONCoordinates, GeoJSONFeature } from '../../typings.d'
import { Route } from '../../typings.d'

export interface MapProps {
  ymaps?: any
}

export interface RouteProps {
  ymaps?: any
  mapRef: any
  points: GeoJSONCoordinates[]
}

export interface RouteManagerCache {
  [key: string]: any
}

export interface MobileMapProps {
  center: GeoJSONCoordinates
  zoom: number
  features: GeoJSONFeature[]
  points?: GeoJSONCoordinates[]
  renderPlacemark: (value: GeoJSONFeature, index: number, array: GeoJSONFeature[]) => {}
  onBoundsChange: Function
}

export interface DesktopMapProps {
  center: GeoJSONCoordinates
  zoom: number
  features: GeoJSONFeature[]
  points?: GeoJSONCoordinates[]
  renderPlacemark: (value: GeoJSONFeature, index: number, array: GeoJSONFeature[]) => {}
  onBoundsChange: Function
}
