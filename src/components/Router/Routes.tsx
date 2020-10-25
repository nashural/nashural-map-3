import React, { FC } from 'react'

import { RoutesProps } from './typings.d'

import './desktop.css'

export const Routes: FC<RoutesProps> = ({ innerRef, children }) => {
  return (
    <div className="Routes" ref={innerRef}>
      {children}
    </div>
  )
}
