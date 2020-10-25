import React, { FC } from 'react'

import { ErrorProps } from './typings.d';

import "./desktop.css"

export const Error: FC<ErrorProps> = ({ error }) => {
  return (
    <div className="Error">
      {error.message}
      {error.stack}
    </div>
  )
}