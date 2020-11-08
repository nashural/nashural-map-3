import React, { FC, useCallback } from 'react'
import Media from 'react-media'

import { DESKTOP, MOBILE } from '../../constants/mediaQueries'

import { ModalCloseProps } from './typings.d'

import './desktop.css'

export const ModalClose: FC<ModalCloseProps> = ({ onClose }) => {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Media queries={{ desktop: DESKTOP, mobile: MOBILE }} defaultMatches={{ desktop: true }}>{({ mobile, desktop }) => {
      return (
        <button
          className={`Modal-close ${desktop ? 'desktop' : ''} ${mobile ? 'mobile' : ''}`}
          onClick={handleClose}><i className="fa fa-times"></i>
        </button>
      )
    }}</Media>
  )
}
