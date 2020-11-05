import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Logotype } from '../Logotype'
import { placeSelector } from '../../store/slices/map'

import { MobileHeaderProps } from './typings.d'

import "./mobile.css"

export const MobileHeader: FC<MobileHeaderProps> = () => {
  const place = useSelector(placeSelector)

  return (
    <div className="Header mobile">
      {place ? <div className="Header-place mobile">{place}</div> : <Logotype />}
    </div>
  )
}
