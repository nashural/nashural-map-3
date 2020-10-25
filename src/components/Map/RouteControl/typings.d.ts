export interface RouteControlProps {}

export interface RouteProps {
  content: string
  articleUrl: string
  descriptionUrl: string
  referencePoints: [number, number][]
  onSelect: Function
}
