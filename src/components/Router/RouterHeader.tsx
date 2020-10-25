import React, { FC } from 'react'

import { RouterHeaderProps } from './typings.d'

import "./desktop.css"

export const RouterHeader: FC<RouterHeaderProps> = () => {
  return (
    <div className="Router-header">Маршрут</div>
  )
}
