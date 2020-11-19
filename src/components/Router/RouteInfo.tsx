import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { routeInfoSelector } from '../../store/slices/router'

import { RouteInfoProps } from './typings.d'

export const RouteInfo: FC<RouteInfoProps> = () => {
  const info = useSelector(routeInfoSelector)

  if (info.show) {
    return (
      <div className="RouteInfo">
        <div>
          <b>Длина маршрута:</b> {info.humanLength}
        </div>
        <div>
          <b>Расход топлива:</b> {info.humanFuel}
        </div>
        <div>
          <b>Время в пути:</b> {info.humanJamsTime}
        </div>
      </div>
    )
  } else {
    return null
  }
}
