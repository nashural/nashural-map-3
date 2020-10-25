export interface RegionControlProps {}

export interface RegionProps {
  content: string
  center: [number, number]
  zoom: number
  onSelect: Function
}
