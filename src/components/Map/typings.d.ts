import { GeoJSONCoordinates, GeoJSONFeature } from '../../typings.d'

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
  groupedFeatures: Record<string, GeoJSONFeature[]>
  points?: GeoJSONCoordinates[]
  onPlacemarkClick: (feature: GeoJSONFeature) => void
  onBoundsChange: Function
}

export interface DesktopMapProps {
  center: GeoJSONCoordinates
  zoom: number
  groupedFeatures: Record<string, GeoJSONFeature[]>
  points?: GeoJSONCoordinates[]
  onPlacemarkClick: (feature: GeoJSONFeature) => void
  onBoundsChange: Function
}

export interface FeaturesGroupProps {
  groupId: string
  features: GeoJSONFeature[]
  onPlacemarkClick: (feature: GeoJSONFeature) => void
}
