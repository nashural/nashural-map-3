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

export const App: FC<AppProps> = () => {
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
