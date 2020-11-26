import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { GroupSearchResult } from './GroupSearchResult'
import { groupsSelector } from '../../store/slices/search'

import { SearchResultProps } from './typings.d'

export const SearchResult: FC<SearchResultProps> = () => {
  const groups = useSelector(groupsSelector)

  const renderGroup = (groupId: string) => {
    return <GroupSearchResult key={groupId} id={groupId} />
  }

  return (
    <div className="Groups-list">
      {groups.map(renderGroup)}
    </div>
  )
}
