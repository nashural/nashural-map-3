import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Groups } from '../Groups'
import { Header } from '../Header'
import { Map } from '../Map'
import { Router } from '../Router'
import { drawerOpenedSelector } from '../../store/slices/drawer'
import { routerOpenedSelector } from '../../store/slices/router'

import { AppProps } from './typings'

import "./desktop.css"

// DEBUG:
import { useDispatch } from '../../hooks/useDispatch'
import { useEffect } from 'react'
import { toggleDrawer } from '../../store/slices/drawer'
import { toggleRouter } from '../../store/slices/router'

export const App: FC<AppProps> = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let t2: any
    let t3: any
    const t = setTimeout(() => {
      dispatch(toggleDrawer({ on: false }))
      dispatch(toggleRouter({ on: true }))
      t2 = setTimeout(() => {
        dispatch(toggleRouter({ on: false }))
      }, 2 * 1000)
      t3 = setTimeout(() => {
        dispatch(toggleDrawer({ on: true }))
      }, 4 * 1000)
    }, 5 * 1000)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
      clearTimeout(t3)
    }
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
