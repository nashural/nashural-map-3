import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { useDispatch } from '../../hooks/useDispatch'
import { RouterHeader } from './RouterHeader'
import { Routes } from './Routes'
import { Route } from './Route'
import { routesSelector, reorderRoutes, appendRoute } from '../../store/router'
import { Button } from '../Button'

import { RouterProps } from './typings.d'

import "./desktop.css"

export const Router: FC<RouterProps> = () => {
  const dispatch = useDispatch()
  const routes = useSelector(routesSelector)

  const handleDragEnd = useCallback(({ source, destination }) => {
    dispatch(reorderRoutes({
      fromIdx: source.index,
      toIdx: destination.index
    }))
  }, [dispatch])

  const handleAppendButton = useCallback(() => {
    dispatch(appendRoute({
      route: {
        id: `${0|Math.random()*0xffffff}`,
        name: 'Новая точка'
      }
    }))
  }, [dispatch])

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
