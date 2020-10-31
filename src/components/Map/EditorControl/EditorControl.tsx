import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-yandex-maps'

import { useDispatch } from '../../../hooks/useDispatch'
import { toggleRouter } from '../../../store/slices/router'
import { routerOpenedSelector } from '../../../store/slices/router'

import { EditorControlProps } from './typings.d'

export const EditorControl: FC<EditorControlProps> = () => {
  const dispatch = useDispatch()
  const routerOpened = useSelector(routerOpenedSelector)

  const handleSelect = useCallback(() => {
    dispatch(toggleRouter({ on: true }))
  }, [dispatch])

  const handleDeselect = useCallback(() => {
    dispatch(toggleRouter({ on: false }))
  }, [dispatch])

  return (
    <Button
      data={{ content: 'Редактор маршрута' }}
      state={{ selected: routerOpened }}
      onSelect={handleSelect}
      onDeselect={handleDeselect}
    />
  )
}
