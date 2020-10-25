export interface Group {
  id: string
  name: string
  iconHref: string
  className: string
  count: number
}

export type GeoJSONCoordinates = [number, number]

export interface GeoJSONMetadata {
  name: string
  creator: string
}

export interface GeoJSONGeometry {
  type: string
  coordinates: GeoJSONCoordinates
}

export interface CustomProperties {
  iconCaption: string
  previewSrc: string
  articleHref: string
  group: string
}

export interface NoProperties {}

export interface GeoJSONFeature {
  type: string
  id: number
  geometry: GeoJSONGeometry,
  properties: CustomProperties|NoProperties
}

export interface GeoJSON {
  type: string,
  metadata: GeoJSONMetadata,
  features: GeoJSONFeature[]
}
