import React, { FC } from 'react'

import { ModalButtonsProps } from './typings.d'

import './desktop.css'

export const ModalButtons: FC<ModalButtonsProps> = ({ children }) => {
  return (
    <div className="Modal-buttons">{children}</div>
  )
}
