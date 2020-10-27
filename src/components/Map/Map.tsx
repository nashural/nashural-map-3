import React, { FC, useCallback, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Map as YMap, ZoomControl, TypeSelector, GeolocationControl, Placemark } from 'react-yandex-maps'
import Measure from 'react-measure'

import { useDispatch } from '../../hooks/useDispatch'
import { RegionControl } from './RegionControl'
import { RouteControl } from './RouteControl'
import { changeBounds, mapStateSelector } from '../../store/slices/map'
import { allFeaturesSelector } from '../../store/slices/groups'
import { toggleModal } from '../../store/slices/modal'
import { routesSelector } from '../../store/slices/router'
import { drawerOpenedSelector } from '../../store/slices/drawer'
import { routerOpenedSelector } from '../../store/slices/router'
import { Route } from './Route'

import { MapProps } from './typings.d'
import { GeoJSONCoordinates } from '../../typings.d'

import "./desktop.css"

const routeGetCoordinates = ({ coordinates }: { coordinates: GeoJSONCoordinates }): GeoJSONCoordinates => coordinates

export const Map: FC<MapProps> = () => {
  const dispatch = useDispatch()
  const { center, zoom } = useSelector(mapStateSelector)
  const features = useSelector(allFeaturesSelector)
  const routes = useSelector(routesSelector)
  const [bounds, setBounds] = useState({ width: -1, height: -1 })
  const mapRef = useRef(null)
  const drawerOpened = useSelector(drawerOpenedSelector)
  const routerOpened = useSelector(routerOpenedSelector)

  const handlePlacemarkClick = useCallback((e: any) => {
    const { iconCaption, previewSrc, articleHref } = e.get('target').properties.getAll()
    dispatch(toggleModal({
      on: true,
      name: 'placemark',
      props: {
        title: iconCaption,
        src: previewSrc,
        href: articleHref
      }
    }))
  }, [dispatch])

  const renderPlacemark = ({ id, geometry, properties }: any) => {
    return <Placemark
      key={`${properties.group}-${id}`}
      geometry={geometry}
      properties={properties}
      options={{
        preset: 'islands#circleIcon',
        iconColor: '#0074a0'
      }}
      onClick={handlePlacemarkClick}
    />
  }

  const handleBoundsChange = useCallback(e => {
    dispatch(changeBounds({
      center: e.get('newCenter'),
      zoom: e.get('newZoom')
    }))
  }, [dispatch])

  const handleResize = useCallback((contentRect: any) => {
    let width = window.innerWidth
    if (drawerOpened) {
      width -= 240 // Sync with src/components/App/desktop.css:26
    }
    if (routerOpened) {
      width -= 300 // Sync with src/components/App/desktop.css:30
    }
    setBounds({
      ...contentRect.client,
      width
    })
  }, [drawerOpened, routerOpened])

  return (
    <Measure client onResize={handleResize}>{({ measureRef }: any) => {
      return (
        <div className="Map" ref={measureRef}>
          <YMap
            width={bounds.width}
            height={bounds.height}
            state={{ center, zoom }}
            load="geoObject.addon.editor"
            // @ts-ignore
            instanceRef={mapRef}
            onBoundschange={handleBoundsChange}
          >
            <RegionControl />
            <RouteControl />
            <GeolocationControl />
            <TypeSelector />
            <ZoomControl />
            {features.map(renderPlacemark)}
            {Boolean(routes.length) && <Route mapRef={mapRef} points={routes.map(routeGetCoordinates)} />}
          </YMap>
        </div>
      )
    }}</Measure>
  )
}