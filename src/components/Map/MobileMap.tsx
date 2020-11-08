import React, { FC, useRef, useMemo } from 'react'
import { Map as YMap, ZoomControl, TypeSelector, GeolocationControl } from 'react-yandex-maps'
import { useWindowSize } from '@react-hook/window-size'

import { RegionControl } from './RegionControl'
import { RouteControl } from './RouteControl'
import { Route } from './Route'

import { MobileMapProps } from './typings.d'

export const MobileMap: FC<MobileMapProps> = ({ center, zoom, features, points, renderPlacemark, onBoundsChange }) => {
  const mapRef = useRef(null)
  const [width, height_] = useWindowSize()
  const headerHeight = useMemo(() => parseInt(getComputedStyle(document.body).getPropertyValue('--header-height'), 10), [])
  const height = height_ - headerHeight

  console.log('points =', points)

  return (
    <div className="Map mobile">
      <YMap
        width={width}
        height={height}
        state={{ center, zoom }}
        load="geoObject.addon.editor"
        // @ts-ignore
        instanceRef={mapRef}
        onBoundschange={onBoundsChange}
      >
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
}
