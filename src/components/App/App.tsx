import React, { FC, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Media from 'react-media'

import { Groups } from '../Groups'
import { Header } from '../Header'
import { Map } from '../Map'
import { Router } from '../Router'
import { drawerOpenedSelector } from '../../store/slices/drawer'
import { routerOpenedSelector } from '../../store/slices/router'
import { toggleDrawer } from '../../store/slices/drawer'
import { useDispatch } from '../../hooks/useDispatch'
import { DESKTOP, MOBILE } from '../../constants/mediaQueries'

import { AppProps } from './typings.d'

import "./universal.css"
import "./desktop.css"
import "./mobile.css"


export const App: FC<AppProps> = () => {
  const dispatch = useDispatch()
  const drawerOpened = useSelector(drawerOpenedSelector)
  const routerOpened = useSelector(routerOpenedSelector)
  const { matches: mobile } = useMemo(() => window.matchMedia(MOBILE), [])

  useEffect(() => {
    if (mobile) dispatch(toggleDrawer({ on: false }))
  }, [dispatch, mobile])
  
  return (
    <Media queries={{ mobile: MOBILE, desktop: DESKTOP }}>{({ mobile, desktop }: { mobile: boolean, desktop: boolean }) => {
      return (
        <div className={`App ${drawerOpened ? 'drawer' : ''} ${routerOpened ? 'router' : ''} ${desktop ? 'desktop' : ''} ${mobile ? 'mobile' : ''}`}>
          <Header />
          <Groups />
          <Map />
          <Router />
        </div>
      )
    }}</Media>
  )
}
