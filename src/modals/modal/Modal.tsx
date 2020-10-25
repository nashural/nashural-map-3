import React, { FC } from 'react'

import { ModalProps } from './typings.d'

import "./desktop.css"

export const Modal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="Modal">
      <button className="Modal-close" onClick={onClose}><i className="fa fa-times"></i></button>
      {children}
    </div>
  )
}
