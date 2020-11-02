import React, { FC } from 'react'

import { ModalProps } from './typings.d'

import "./desktop.css"

export const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className="Modal">
      {children}
    </div>
  )
}
