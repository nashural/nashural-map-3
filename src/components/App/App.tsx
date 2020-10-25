import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Groups } from '../Groups'
import { Header } from '../Header'
import { Map } from '../Map'
import { Router } from '../Router'
import { drawerOpenedSelector } from '../../store/drawer'
import { routerOpenedSelector } from '../../store/router'

import { AppProps } from './typings'

import "./desktop.css"

// DEBUG:
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toggleDrawer } from '../../store/drawer'
import { toggleRouter } from '../../store/router'

export const App: FC<AppProps> = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const t = setTimeout(() => {
      // dispatch(toggleDrawer({ on: false }))
      dispatch(toggleRouter({ on: true }))
    }, 5 * 1000)
    return () => clearTimeout(t)
  }, [dispatch])

  const drawerOpened = useSelector(drawerOpenedSelector)
  const routerOpened = useSelector(routerOpenedSelector)

  return (
    <div className={`App ${drawerOpened ? 'drawer' : ''} ${routerOpened ? 'router' : ''}`}>
      <Header />
      <Groups />
      <Map />
      <Router />
    </div>
  )
}
