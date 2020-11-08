import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { withYMaps } from 'react-yandex-maps'
import { nanoid } from 'nanoid'
import Media from 'react-media'

import { useDispatch } from '../../hooks/useDispatch'
import { RouterHeader } from './RouterHeader'
import { Routes } from './Routes'
import { routesSelector, reorderRoutes, appendRoute } from '../../store/slices/router'
import { Button } from '../Button'
import { DESKTOP, MOBILE } from '../../constants/mediaQueries'

import { RouterProps } from './typings.d'

import "./universal.css"
import "./desktop.css"
import "./mobile.css"

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
    <Media queries={{ desktop: DESKTOP, mobile: MOBILE }} defaultMatches={{ desktop: true }}>{({ desktop, mobile }) => {
      return (
        <div className={`Router ${mobile ? 'mobile' : ''} ${desktop ? 'desktop' : ''}`}>
          {desktop && <RouterHeader />}
          {mobile && <Button className="Router-add-btn" onClick={handleAppendButton}>Добавить точку</Button>}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="routes">{(provided) =>
              <Routes routes={routes} innerRef={provided.innerRef} {...provided.droppableProps}>
                {provided.placeholder}
              </Routes>
            }</Droppable>
          </DragDropContext>
          {desktop && <Button className="Router-add-btn" onClick={handleAppendButton}>Добавить точку</Button>}
        </div>
      )
    }}</Media>
  )

}

export const Router = withYMaps(Router_)
