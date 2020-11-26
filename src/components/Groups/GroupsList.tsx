import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Group as GroupItem } from './Group'
import { allGroupsSelector } from '../../store/slices/groups'

import { GroupsListProps } from './typings.d'
import { Group } from '../../typings.d'

export const GroupsList: FC<GroupsListProps> = () => {
  const groups = useSelector(allGroupsSelector)

  const renderGroup = (group: Group) => {
    return <GroupItem key={group.id} {...group} />
  }

  return (
    <div className="Groups-list">
      {groups.map(renderGroup)}
    </div>
  )
}
