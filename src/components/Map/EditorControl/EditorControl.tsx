import React, { FC, useCallback } from 'react'
import { Button } from 'react-yandex-maps'

import { useDispatch } from '../../../hooks/useDispatch'
import { toggleRouter } from '../../../store/slices/router'

import { EditorControlProps } from './typings.d'

export const EditorControl: FC<EditorControlProps> = () => {
  const dispatch = useDispatch()

  const handleSelect = useCallback(e => {
    dispatch(toggleRouter({ on: true }))
  }, [dispatch])

  const handleDeselect = useCallback(e => {
    dispatch(toggleRouter({ on: false }))
  }, [dispatch])

  return (
    <Button
      data={{ content: 'Редактор маршрута' }}
      onSelect={handleSelect}
      onDeselect={handleDeselect}
    />
  )
}
