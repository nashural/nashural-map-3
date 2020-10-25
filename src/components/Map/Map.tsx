import React, { FC, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Map as YMap, ZoomControl, TypeSelector, GeolocationControl, Placemark, withYMaps } from 'react-yandex-maps'
import Measure from 'react-measure'

import { RegionControl } from './RegionControl'
import { RouteControl } from './RouteControl'
import { changeBounds, mapStateSelector } from '../../store/map'
import { allFeaturesSelector } from '../../store/groups'
import { toggleModal } from '../../store/modal'
import { routesSelector } from '../../store/router'
import { drawerOpenedSelector } from '../../store/drawer'
import { routerOpenedSelector } from '../../store/router'

import { MapProps } from './typings.d'
import { GeoJSONCoordinates } from '../../typings.d'

import "./desktop.css"

const routeGetCoordinates = ({ coordinates }: { coordinates: GeoJSONCoordinates }): GeoJSONCoordinates => coordinates

// @ts-ignore
export const Map: FC<MapProps> = withYMaps(({ ymaps }) => {
  const dispatch = useDispatch()
  const { center, zoom } = useSelector(mapStateSelector)
  const features = useSelector(allFeaturesSelector)
  const routes = useSelector(routesSelector)
  const [bounds, setBounds] = useState({ width: -1, height: -1 })
  const [map, setMap] = useState(null)
  const [prevRoute, setPrevRoute] = useState(null)
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

  useEffect(() => {
    if (map) {
      if (prevRoute) {
        debugger
        // (map as any).geoObjects.remove(prevRoute)
      }

      const points = routes.map(routeGetCoordinates)
      ymaps.route(points)
        .then((route: any) => {
          // @ts-ignore
          setPrevRoute({ a: 1 })
          (map as any).geoObjects.add(route)
        })
        .catch((error: any) => {
          console.error(error)
        })
    }
  }, [ymaps, map, routes, prevRoute])

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
            instanceRef={setMap}
            onBoundschange={handleBoundsChange}
          >
            <RegionControl />
            <RouteControl />
            <GeolocationControl />
            <TypeSelector />
            <ZoomControl />
            {features.map(renderPlacemark)}
          </YMap>
        </div>
      )
    }}</Measure>
  )
})