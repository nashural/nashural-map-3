import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Media from 'react-media'

import { useDispatch } from '../../hooks/useDispatch'
import { Group as GroupItem } from './Group'
import { fetchGroups, allGroupsSelector } from '../../store/slices/groups'
import { DESKTOP, MOBILE } from '../../constants/mediaQueries'

import { GroupsProps } from './typings.d'

import "./universal.css"
import "./desktop.css"
import "./mobile.css"

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
    <Media queries={{ desktop: DESKTOP, mobile: MOBILE }} defaultMatches={{ desktop: true }}>{({ desktop, mobile }) => {
      return (
        <div className={`Groups ${mobile ? 'mobile' : ''} ${desktop ? 'desktop' : ''}`}>
          {groups.map(renderGroup)}
        </div>
      )
    }}</Media>
  )
}
