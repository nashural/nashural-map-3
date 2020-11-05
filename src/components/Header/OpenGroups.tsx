import React, { FC } from 'react'

import { OpenGroupsProps } from './typings.d'

import "./mobile.css"

export const OpenGroups: FC<OpenGroupsProps> = () => {
  return <button className="OpenGroups mobile">Каталог</button>
}
