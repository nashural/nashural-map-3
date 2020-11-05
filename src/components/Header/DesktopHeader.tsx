import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Logotype } from '../Logotype'
import { placeSelector } from '../../store/slices/map'

import { DesktopHeaderProps } from './typings.d'

import "./desktop.css"

export const DesktopHeader: FC<DesktopHeaderProps> = () => {
  const place = useSelector(placeSelector)

  return (
    <div className="Header dekstop">
      {place ? <div className="Header-place dekstop">{place}</div> : <Logotype />}
    </div>
  )
}
