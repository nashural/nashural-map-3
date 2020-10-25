import React, { FC } from 'react'

import { BadgeProps } from './typings'

import "./desktop.css"

export const Badge: FC<BadgeProps> = ({ count }) => {
  return (
    <div className="Badge">
      {count}
    </div>
  )
}
