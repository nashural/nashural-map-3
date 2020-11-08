import React, { FC } from 'react'
import Media from 'react-media'

import { DESKTOP, MOBILE } from '../../constants/mediaQueries'

import { ModalFooterProps } from './typings.d'

import "./desktop.css"

export const ModalFooter: FC<ModalFooterProps> = ({ children }) => {
  return (
    <Media queries={{ desktop: DESKTOP, mobile: MOBILE }} defaultMatches={{ desktop: true }}>{({ mobile, desktop }) => {
      return (
        <div className={`Modal-footer ${desktop ? 'desktop' : ''} ${mobile ? 'mobile' : ''}`}>{children}</div>
      )
    }}</Media>
  )

}
