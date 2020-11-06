import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { drawerOpenedSelector } from '../../store/slices/drawer'
import { toggleDrawer } from '../../store/slices/drawer'
import { toggleRouter } from '../../store/slices/router'
import { useDispatch } from '../../hooks/useDispatch'

import { OpenGroupsProps } from './typings.d'

import "./mobile.css"

export const OpenGroups: FC<OpenGroupsProps> = () => {
  const dispatch = useDispatch()
  const opened = useSelector(drawerOpenedSelector)

  const handleClick = useCallback(() => {
    dispatch(toggleDrawer({ on: !opened }))
    dispatch(toggleRouter({ on: false }))
  }, [dispatch, opened])

  return <button className={`OpenGroups mobile ${opened ? 'opened' : ''}`} onClick={handleClick}>Каталог</button>
}
