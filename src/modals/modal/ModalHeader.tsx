import React, { FC } from 'react'

import { ModalHeaderProps } from './typings.d'

import "./desktop.css"

export const ModalHeader: FC<ModalHeaderProps> = ({ children }) => {
  return (
    <div className="Modal-header">{children}</div>
  )
}
