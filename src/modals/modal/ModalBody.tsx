import React, { FC } from 'react'
import Media from 'react-media'

import { DESKTOP, MOBILE } from '../../constants/mediaQueries'

import { ModalBodyProps } from './typings.d'

import "./desktop.css"

export const ModalBody: FC<ModalBodyProps> = ({ children }) => {
  return (
    <Media queries={{ desktop: DESKTOP, mobile: MOBILE }} defaultMatches={{ desktop: true }}>{({ mobile, desktop }) => {
      return (
        <div className={`Modal-body ${desktop ? 'desktop' : ''} ${mobile ? 'mobile' : ''}`}>{children}</div>
      )
    }}</Media>
  )
}
