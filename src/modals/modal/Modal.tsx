import React, { FC } from 'react'
import Media from 'react-media'

import { DESKTOP, MOBILE } from '../../constants/mediaQueries'

import { ModalProps } from './typings.d'

import "./universal.css"
import "./desktop.css"
import "./mobile.css"

export const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <Media queries={{ desktop: DESKTOP, mobile: MOBILE }} defaultMatches={{ desktop: true }}>{({ mobile, desktop }) => {
      return (
        <div className={`Modal ${desktop ? 'desktop' : ''} ${mobile ? 'mobile' : ''}`}>
          {children}
        </div>
      )
    }}</Media>
  )
}
