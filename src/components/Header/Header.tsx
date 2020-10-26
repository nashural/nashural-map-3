import React, { FC } from 'react'
import { useSelector } from 'react-redux';

import { Logotype } from './Logotype'
import { placeSelector } from '../../store/slices/map'

import { HeaderProps } from './typings'

import "./desktop.css"

export const Header: FC<HeaderProps> = () => {
  const place = useSelector(placeSelector)

  return (
    <div className="Header">
      {place ? <div className="Header-place">{place}</div> : <Logotype />}
    </div>
  )
}
