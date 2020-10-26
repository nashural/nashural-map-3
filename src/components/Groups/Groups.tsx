import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'

// import { Error } from '../Error'
// import { Spinner } from '../Spinner'
import { useDispatch } from '../../hooks/useDispatch'
import { Group as GroupItem } from './Group'

import { GroupsProps } from './typings.d'
// import { Group } from '../../typings.d';
import { fetchGroups, allGroupsSelector } from '../../store/groups';

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
