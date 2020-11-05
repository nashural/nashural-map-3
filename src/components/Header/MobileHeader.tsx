import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Logotype } from '../Logotype'
import { placeSelector } from '../../store/slices/map'
import { OpenGroups } from './OpenGroups'
import { OpenRouter } from './OpenRouter'

import { MobileHeaderProps } from './typings.d'

import "./mobile.css"

export const MobileHeader: FC<MobileHeaderProps> = () => {
  const place = useSelector(placeSelector)

  return (
    <div className="Header mobile">
      <OpenGroups />
      {place ? <div className="Header-place mobile">{place}</div> : <Logotype />}
      <OpenRouter />
    </div>
  )
}
