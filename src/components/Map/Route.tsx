import { FC, memo, useLayoutEffect, useMemo, useCallback } from 'react'
import { withYMaps } from 'react-yandex-maps'

import { useDispatch } from '../../hooks/useDispatch';
import { RouteManager } from './RouteManager'
import { toggleInfo } from '../../store/slices/router'

import { RouteProps } from './typings.d'

const Route_: FC<RouteProps> = memo<RouteProps>(({ points, mapRef, ymaps }) => {
  const dispatch = useDispatch()
  const routeManager = useMemo(() => new RouteManager(ymaps, mapRef), [ymaps, mapRef])

  const handleRoute = useCallback((route: any) => {
    dispatch(toggleInfo({
      show: true,
      humanTime: (route.getHumanTime() as string).replace('&#160;', ' '),
      humanJamsTime: (route.getHumanJamsTime() as string).replace('&#160;', ''),
      humanLength: (route.getHumanLength() as string).replace('&#160;', ' '),
      humanFuel: `${route.getLength() / 1000 / 10} литров`
    }))
  }, [dispatch])

  useLayoutEffect(() => {
    routeManager.update(points, handleRoute)
    
    return () => {
      routeManager.clear()
    }
  }, [points, routeManager, handleRoute])

  return null
})

export const Route = withYMaps(Route_)
