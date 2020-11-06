import React, { FC, useRef, useMemo } from 'react'
import { Map as YMap, ZoomControl, TypeSelector, GeolocationControl } from 'react-yandex-maps'
import { useWindowSize } from '@react-hook/window-size'

import { RegionControl } from './RegionControl'
import { EditorControl } from './EditorControl'
import { Route } from './Route'

import { MobileMapProps } from './typings.d'
import { GeoJSONCoordinates } from '../../typings.d'

const routeGetCoordinates = ({ coordinates }: { coordinates: GeoJSONCoordinates }): GeoJSONCoordinates => coordinates

export const MobileMap: FC<MobileMapProps> = ({ center, zoom, features, routes, renderPlacemark, onBoundsChange }) => {
  const mapRef = useRef(null)
  const [width, height_] = useWindowSize()
  const headerHeight = useMemo(() => parseInt(getComputedStyle(document.body).getPropertyValue('--header-height'), 10), [])
  const height = height_ - headerHeight

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
            <EditorControl />
            <RegionControl />
            <GeolocationControl />
            <TypeSelector />
            <ZoomControl />
            {features.map(renderPlacemark)}
            {(routes.length >= 2) && <Route mapRef={mapRef} points={routes.map(routeGetCoordinates)} />}
        </YMap>
    </div>
  )
}
