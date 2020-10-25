import React, { FC } from 'react'

import { ModalBodyProps } from './typings.d'

import "./desktop.css"

export const ModalBody: FC<ModalBodyProps> = ({ children }) => {
  return (
    <div className="Modal-body">{children}</div>
  )
}
