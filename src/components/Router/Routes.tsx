import React, { FC } from 'react'

import { Route } from './Route'

import { RoutesProps } from './typings.d'

import './desktop.css'

export const Routes: FC<RoutesProps> = ({ routes, innerRef, children }) => {
  const renderRoute = (props: any, index: number) => {
    return <Route key={props.id} index={index} {...props} />
  }

  return (
    <div className="Routes" ref={innerRef}>
      {routes.map(renderRoute)}
      {children}
    </div>
  )
}
