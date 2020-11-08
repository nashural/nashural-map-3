import React, { FC, useCallback, useState, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Map as YMap, ZoomControl, TypeSelector, GeolocationControl } from 'react-yandex-maps'
import Measure from 'react-measure'

import { RegionControl } from './RegionControl'
import { RouteControl } from './RouteControl'
import { EditorControl } from './EditorControl'
import { drawerOpenedSelector } from '../../store/slices/drawer'
import { routerOpenedSelector } from '../../store/slices/router'
import { Route } from './Route'

import { DesktopMapProps } from './typings.d'

import "./desktop.css"

export const DesktopMap: FC<DesktopMapProps> = ({ center, zoom, features, points, renderPlacemark, onBoundsChange }) => {
  const mapRef = useRef(null)
  const [bounds, setBounds] = useState({ width: -1, height: -1 })
  const drawerOpened = useSelector(drawerOpenedSelector)
  const routerOpened = useSelector(routerOpenedSelector)
  const drawerFullWidth = useMemo(() => parseInt(getComputedStyle(document.body).getPropertyValue('--drawer-full-width'), 10), [])
  const routerFullWidth = useMemo(() => parseInt(getComputedStyle(document.body).getPropertyValue('--router-full-width'), 10), [])

  console.log('points =', points)

  const handleResize = useCallback((contentRect: any) => {
    let width = window.innerWidth
    if (drawerOpened) {
      width -= drawerFullWidth
    }
    if (routerOpened) {
      width -= routerFullWidth
    }
    setBounds({
      ...contentRect.client,
      width
    })
  }, [drawerOpened, routerOpened, drawerFullWidth, routerFullWidth])

  return (
    <Measure client onResize={handleResize}>{({ measureRef }: any) => {
      return (
        <div className="Map desktop" ref={measureRef}>
          <YMap
            width={bounds.width}
            height={bounds.height}
            state={{ center, zoom }}
            load="geoObject.addon.editor"
            // @ts-ignore
            instanceRef={mapRef}
            onBoundschange={onBoundsChange}
          >
            <EditorControl />
            <RegionControl />
            <RouteControl />
            <GeolocationControl />
            <TypeSelector />
            <ZoomControl />
            {features.map(renderPlacemark)}
            {points ? <Route mapRef={mapRef} points={points} /> : null}
          </YMap>
        </div>
      )
    }}</Measure>
  )
}
