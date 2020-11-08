import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { routerOpenedSelector } from '../../store/slices/router'
import { toggleRouter } from '../../store/slices/router'
import { toggleDrawer } from '../../store/slices/drawer'
import { useDispatch } from '../../hooks/useDispatch'

import { OpenRouterProps } from './typings.d'

import "./mobile.css"

export const OpenRouter: FC<OpenRouterProps> = () => {
  const dispatch = useDispatch()
  const opened = useSelector(routerOpenedSelector)

  const handleClick = useCallback(() => {
    dispatch(toggleRouter({ on: !opened }))
    dispatch(toggleDrawer({ on: false }))
  }, [dispatch, opened])

  return (
    <button
      className={`OpenRouter mobile ${opened ? 'opened' : ''}`}
      onClick={handleClick}>{opened ? 'Карта' : 'Маршрут'}</button>
  )
}
