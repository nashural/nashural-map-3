import { GeoJSONCoordinates } from '../../typings';

export interface MapProps {}

export interface RouteProps {
  ymaps?: any // TODO: Specific type
  mapRef: any // TODO: Specific type
  points: GeoJSONCoordinates[]
}
