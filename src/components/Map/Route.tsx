import { FC, useLayoutEffect, useMemo } from 'react'
import { withYMaps } from 'react-yandex-maps'
import { isEqual } from 'lodash'

import { RouteProps } from './typings.d';
import { GeoJSONCoordinates } from '../../typings';

class RouteManager {
  private ymaps: any
  private mapRef: any
  private points: GeoJSONCoordinates[]
  private route: any

  constructor(ymaps: any, mapRef: any) {
    this.ymaps = ymaps
    this.mapRef = mapRef
    this.points = []
    this.route = null
  }

  get map() {
    return this.mapRef.current
  }

  async update(points: GeoJSONCoordinates[]) {
    if (this.points && !isEqual(this.points, points)) {
      this.points = points
      this.map.geoObjects.remove(this.route)
      this.route = await this.ymaps.route(points)
      this.map.geoObjects.add(this.route)
    }
  }

  clear() {
    const { route } = this
    this.map.geoObjects.remove(route)
    this.points = []
    this.route = null
  }
}

// const ROUTE_CACHE: WeakMap<GeoJSONCoordinates[], any> = new WeakMap()

// const getOrCreateRoute = async (ymaps: any, points: GeoJSONCoordinates[]): Promise<any> => {
//   if (ROUTE_CACHE.has(points)) {
//     return ROUTE_CACHE.get(points)
//   } else {
//     const route = await ymaps.route(points)
//     ROUTE_CACHE.set(points, route)
//     return route
//   }
// }

const Route_: FC<RouteProps> = ({ points, mapRef, ymaps }) => {
  const routeManager = useMemo(() => new RouteManager(ymaps, mapRef), [ymaps, mapRef])

  useLayoutEffect(() => {
    routeManager.update(points)

    return () => {
      routeManager.clear()
    }
  }, [points])

  // const [prevRoute, setPrevRoute] = useState()
  // const [route, setRoute] = useState()

  // useLayoutEffect(() => {
    // let cancelled = false
    // const map: any /* TODO: Specific type */ = mapRef.current

    // console.log(32)

    // if (prevRoute && route !== prevRoute) {
    //   map.geoObjects.remove(prevRoute)
    // }

    // ;(async () => {
    //   if (cancelled) return

    //   const nextRoute = await getOrCreateRoute(ymaps, points)
    //   if (nextRoute !== prevRoute) {
    //     setPrevRoute(route)
    //     setRoute(nextRoute)
    //   }
    //   map.geoObjects.add(route)
    // })()

  //   return () => {
  //     cancelled = true
  //     route && map.geoObjects.remove(route)
  //   }
  // }, [mapRef, ymaps, points, route, prevRoute])

  return null
}

export const Route = withYMaps(Route_)
