import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { withYMaps } from 'react-yandex-maps'

import { useDispatch } from '../../hooks/useDispatch'
import { RouterHeader } from './RouterHeader'
import { Routes } from './Routes'
import { Route } from './Route'
import { routesSelector, reorderRoutes, appendRoute } from '../../store/slices/router'
import { Button } from '../Button'

import { RouterProps } from './typings.d'
import { GeoJSONCoordinates } from '../../typings'

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
    const coordinates: GeoJSONCoordinates = geoObjects.position

    dispatch(appendRoute({
      route: {
        id: `${0|Math.random()*0xffffff}`,
        coordinates,
        name: 'Текущее местоположение'
      }
    }))
  }, [dispatch, ymaps])

  const renderRoute = (props: any, index: number) => {
    return <Route key={props.id} index={index} {...props} />
  }

  return (
    <div className="Router">
      <RouterHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="routes">{(provided) =>
          <Routes innerRef={provided.innerRef} {...provided.droppableProps}>
            {routes.map(renderRoute)}
            {provided.placeholder}
          </Routes>
        }</Droppable>
      </DragDropContext>
      <Button className="Router-add-btn" onClick={handleAppendButton}>Добавить точку</Button>
    </div>
  )
}

export const Router = withYMaps(Router_)
