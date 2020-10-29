import { FC, memo, useLayoutEffect, useMemo } from 'react'
import { withYMaps } from 'react-yandex-maps'

import { RouteManager } from './RouteManager'

import { RouteProps } from './typings.d'

const Route_: FC<RouteProps> = memo<RouteProps>(({ points, mapRef, ymaps }) => {
  const routeManager = useMemo(() => new RouteManager(ymaps, mapRef), [ymaps, mapRef])

  useLayoutEffect(() => {
    routeManager.update(points)

    return () => {
      routeManager.clear()
    }
  }, [points, routeManager])

  return null
})

export const Route = withYMaps(Route_)
