import { GeoJSONFeature } from "../../typings"

export interface GroupsProps {}

export interface GroupProps {
  id: string
  name: string
  iconHref: string
  className: string
  count: number
}

export interface BadgeProps {
  count: number
}

export interface GroupsSearchProps {}

export interface GroupsListProps {}

export interface SearchResultProps {}

export interface GroupSearchResultProps {
  id: string
}

export interface SearchResultFeatureProps {
  feature: GeoJSONFeature
}

export interface GroupsHeaderProps {
  
}
