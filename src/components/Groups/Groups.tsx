import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from '../../hooks/useDispatch'
import { Group as GroupItem } from './Group'
import { fetchGroups, allGroupsSelector } from '../../store/slices/groups';

import { GroupsProps } from './typings.d'

import "./desktop.css"

export const Groups: FC<GroupsProps> = () => {
  const dispatch = useDispatch()
  const groups = useSelector(allGroupsSelector)

  useEffect(() => {
    dispatch(fetchGroups())
  }, [dispatch])

  const renderGroup = (group: any) => {
    return <GroupItem key={group.id} {...group} />
  }

  return (
    <div className="Groups">
      {groups.map(renderGroup)}
    </div>
  )
}
