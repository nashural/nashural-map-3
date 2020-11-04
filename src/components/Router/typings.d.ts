import { Route } from '../../typings.d'

export interface RouterProps {
  ymaps?: any // TODO: Specific type
}

export interface RouterHeaderProps {}

export interface RoutesProps {
  innerRef: any
  routes: Route[]
}

export interface RouteProps {
  id: string
  index: number
  name: string
  immutable: boolean
}
