import React, { FC } from 'react'

import { SpinnerProps } from './typings.d'

import "./desktop.css"

export const Spinner: FC<SpinnerProps> = () => {
  return (
    <div className="Spinner">
      <div className="Spinner-dot" />
      <div className="Spinner-dot" style={{ animationDelay: '0.67s' }} />
      <div className="Spinner-dot" style={{ animationDelay: '1s' }} />
    </div>
  )
}
