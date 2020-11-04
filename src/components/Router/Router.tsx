import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { withYMaps } from 'react-yandex-maps'
import { nanoid } from 'nanoid'

import { useDispatch } from '../../hooks/useDispatch'
import { RouterHeader } from './RouterHeader'
import { Routes } from './Routes'
import { routesSelector, reorderRoutes, appendRoute } from '../../store/slices/router'
import { Button } from '../Button'

import { RouterProps } from './typings.d'

import "./desktop.css"

const Router_: FC<RouterProps> = ({ ymaps }) => {
  const dispatch = useDispatch()
  const routes = useSelector(routesSelector)

  const handleDragEnd = useCallback(({ source, destination }) => {
    dispatch(reorderRoutes({
      fromIdx: source.index,
      toIdx: destination.index
    }))
  }, [dispatch])

  const handleAppendButton = useCallback(async () => {
    const { geoObjects } = await ymaps.geolocation.get({
      autoReverseGeocode: true,
    })

    dispatch(appendRoute({
      route: {
        id: nanoid(),
        coordinates: geoObjects.position,
        name: 'Текущее местоположение'
      }
    }))
  }, [dispatch, ymaps])

  

  return (
    <div className="Router">
      <RouterHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="routes">{(provided) =>
          <Routes routes={routes} innerRef={provided.innerRef} {...provided.droppableProps}>
            {provided.placeholder}
          </Routes>
        }</Droppable>
      </DragDropContext>
      <Button className="Router-add-btn" onClick={handleAppendButton}>Добавить точку</Button>
    </div>
  )
}

export const Router = withYMaps(Router_)
