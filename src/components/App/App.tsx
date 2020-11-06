import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import Media from 'react-media'

import { Groups } from '../Groups'
import { Header } from '../Header'
import { Map } from '../Map'
import { Router } from '../Router'
import { drawerOpenedSelector } from '../../store/slices/drawer'
import { routerOpenedSelector } from '../../store/slices/router'
import { DESKTOP, MOBILE } from '../../constants/mediaQueries'

import { AppProps } from './typings.d'

import "./universal.css"
import "./desktop.css"
import "./mobile.css"

// DEBUG ONLY:
import { useEffect } from 'react'
import { toggleDrawer } from '../../store/slices/drawer'
import { useDispatch } from '../../hooks/useDispatch'

export const App: FC<AppProps> = () => {
  const drawerOpened = useSelector(drawerOpenedSelector)
  const routerOpened = useSelector(routerOpenedSelector)

  // DEBUG ONLY:
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(toggleDrawer({ on: false }))
  }, [dispatch])

  return (
    <Media queries={{ mobile: MOBILE, desktop: DESKTOP }}>{({ mobile, desktop }: { mobile: boolean, desktop: boolean }) => {
      if (mobile) {
        return (
          <div className={`App ${drawerOpened ? 'drawer' : ''} ${routerOpened ? 'router' : ''} mobile`}>
            <Header />
            <div className="App-screen mobile">
              <Groups />
              <Map />
              <Router />
            </div>
          </div>
        )
      }

      if (desktop) {
        return (
          <div className={`App ${drawerOpened ? 'drawer' : ''} ${routerOpened ? 'router' : ''} desktop`}>
            <Header />
            <Groups />
            <Map />
            <Router />
          </div>
        )
      }

      return null
    }}</Media>
  )
}
