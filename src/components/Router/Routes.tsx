import React, { FC } from 'react'
import Media from 'react-media'

import { Route } from './Route'
import { DESKTOP, MOBILE } from '../../constants/mediaQueries'

import { RoutesProps } from './typings.d'

import './desktop.css'

export const Routes: FC<RoutesProps> = ({ routes, innerRef, children }) => {
  const renderRoute = (props: any, index: number) => {
    return <Route key={props.id} index={index} {...props} />
  }

  return (
    <Media queries={{ desktop: DESKTOP, mobile: MOBILE }} defaultMatches={{ desktop: true }}>{({ desktop, mobile }) => {
      return (
        <div className={`Routes ${mobile ? 'mobile' : ''} ${desktop ? 'desktop' : ''}`} ref={innerRef}>
          {routes.map(renderRoute)}
          {children}
        </div>
      )
    }}</Media>
  )

}
