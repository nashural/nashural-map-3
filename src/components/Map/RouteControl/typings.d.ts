import { GeoJSONCoordinates } from "../../../typings"

export interface RouteControlProps {}

export type ReferencePoint = [string, GeoJSONCoordinates]

export interface RouteProps {
  content: string
  articleUrl: string
  descriptionUrl: string
  referencePoints: ReferencePoint[]
  onSelect: Function
}
