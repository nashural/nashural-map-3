import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Badge } from './Badge'
import { selectGroupById } from '../../store/slices/groups'
import { selectFeaturesByGroupId } from '../../store/slices/search'
import { SearchResultFeature } from './SearchResultFeature'

import { GroupSearchResultProps } from './typings.d'
import { GeoJSONFeature, Group } from '../../typings'

export const GroupSearchResult: FC<GroupSearchResultProps> = ({ id }) => {
  const { iconHref, name } = useSelector(selectGroupById(id)) as Group
  const features = useSelector(selectFeaturesByGroupId(id))

  const renderFeature = (feature: GeoJSONFeature) => {
    return <SearchResultFeature key={feature.id} feature={feature} />
  }

  return (
    <div className="GroupSearchResult">
      <div
        className="Group"
        style={{ backgroundImage: `URL(${iconHref.replace('/map', process.env.PUBLIC_URL || '')})` }}
      >
        {name}
        <Badge count={features.length} />
      </div>
      <div className="GroupSearchResult-features">
        {features.map(renderFeature)}
      </div>
    </div>
  )
}
