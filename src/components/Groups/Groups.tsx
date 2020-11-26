import React, { FC, useEffect } from 'react'
import Media from 'react-media'
import { useSelector } from 'react-redux'

import { useDispatch } from '../../hooks/useDispatch'
import { fetchGroups } from '../../store/slices/groups'
import { DESKTOP, MOBILE } from '../../constants/mediaQueries'
import { GroupsSearch } from './GroupsSearch'
import { GroupsList } from './GroupsList'
import { enabledSelector } from '../../store/slices/search'
import { SearchResult } from './SearchResult'

import { GroupsProps } from './typings.d'

import "./universal.css"
import "./desktop.css"
import "./mobile.css"

export const Groups: FC<GroupsProps> = () => {
  const dispatch = useDispatch()
  const enabled = useSelector(enabledSelector)

  useEffect(() => {
    dispatch(fetchGroups())
  }, [dispatch])

  return (
    <Media queries={{ desktop: DESKTOP, mobile: MOBILE }} defaultMatches={{ desktop: true }}>{({ desktop, mobile }) => {
      return (
        <div className={`Groups ${mobile ? 'mobile' : ''} ${desktop ? 'desktop' : ''}`}>
          <GroupsSearch />
          {enabled ? <SearchResult /> : <GroupsList />}
        </div>
      )
    }}</Media>
  )
}
