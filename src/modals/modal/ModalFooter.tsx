import React, { FC } from 'react'

import { ModalFooterProps } from './typings.d'

import "./desktop.css"

export const ModalFooter: FC<ModalFooterProps> = ({ children }) => {
  return (
    <div className="Modal-footer">{children}</div>
  )
}
