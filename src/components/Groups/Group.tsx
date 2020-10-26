import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from '../../hooks/useDispatch'
import { Badge } from './Badge'

import { GroupProps } from './typings'
import { toggleGroup, isGroupSelectedById, fetchGroupById } from '../../store/groups'

import './desktop.css'

export const Group: FC<GroupProps> = ({ id, className, name, count }) => {
  const dispatch = useDispatch()
  const active = useSelector(isGroupSelectedById(id))

  const handleClick = useCallback(e => {
    e.preventDefault()

    if (active) {
      // @ts-ignore
      dispatch(toggleGroup({ id, on: false }))
    } else {
      // @ts-ignore
      dispatch(toggleGroup({ id, on: true }))
      dispatch(fetchGroupById(id))
    }
  }, [dispatch, active, id])

  return (
    <a href={`#${id}`} id={id} className={`Group ${className} ${active ? 'active' : ''}`} onClick={handleClick}>
      {name}
      <Badge count={count} />
    </a>
  )
}
