import React, { FC, useCallback } from 'react'

import { ModalCloseProps } from './typings.d'

import './desktop.css'

export const ModalClose: FC<ModalCloseProps> = ({ onClose }) => {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return <button className="Modal-close" onClick={handleClose}><i className="fa fa-times"></i></button>
}