import { FC, memo, useLayoutEffect, useState } from 'react'
import { withYMaps } from 'react-yandex-maps'
import { isEqual } from 'lodash'

import { useDispatch } from '../../hooks/useDispatch'
import { toggleInfo } from '../../store/slices/router'

import { RouteProps } from './typings.d'
import { GeoJSONCoordinates } from '../../typings'

// eslint-disable-next-line @typescript-eslint/no-array-constructor
const ROUTES_CACHE: Array<[GeoJSONCoordinates[], object]> = new Array()

const getRoute = async (ymaps: any, points: GeoJSONCoordinates[]): Promise<any> => {
  for (let [cachedPoints, cachedRoute] of ROUTES_CACHE) {
    if (isEqual(cachedPoints, points)) return Promise.resolve(cachedRoute)
  }
  const route = await ymaps.route(points)
  ROUTES_CACHE.push([points, route])
  return route
}

const Route_: FC<RouteProps> = memo<RouteProps>(({ points, mapRef, ymaps }) => {
  const dispatch = useDispatch()
  const [route, setRoute] = useState(null)

  useLayoutEffect(() => {
    const map = mapRef.current

    if (route) map.geoObjects.remove(route)

    ;(async () => {
      const newRoute = await getRoute(ymaps, points)
      map.geoObjects.add(newRoute)
      setRoute(newRoute)
      dispatch(toggleInfo({
        show: true,
        humanTime: (newRoute.getHumanTime() as string).replace(/&#160;/g, ' '),
        humanJamsTime: (newRoute.getHumanJamsTime() as string).replace(/&#160;/g, ''),
        humanLength: (newRoute.getHumanLength() as string).replace(/&#160;/g, ' '),
        humanFuel: `${Math.ceil(newRoute.getLength() / 1000 / 10)} литров`
      }))
    })()

    return () => {
      if (route) map.geoObjects.remove(route)
    }
  }, [dispatch, mapRef, ymaps, points, route])

  return null
})

export const Route = withYMaps(Route_)
