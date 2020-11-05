import React, { FC } from 'react'
import Media from 'react-media'

import { DesktopHeader } from './DesktopHeader'
import { MobileHeader } from './MobileHeader'
import { DESKTOP, MOBILE } from '../constants/mediaQueries'

import { HeaderProps } from './typings'

import "./universal.css"

export const Header: FC<HeaderProps> = () => {
  return <Media
    queries={{ mobile: MOBILE, desktop: DESKTOP }}
    defaultMatches={{ desktop: true }}
  >{({ mobile, desktop }) => {
    if (mobile) {
      return <MobileHeader />
    }

    if (desktop) {
      return <DesktopHeader />
    }

    return null
  }}</Media>
}
