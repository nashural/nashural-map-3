import React, { FC, useCallback } from 'react'
import { ListBox } from 'react-yandex-maps'

import { useDispatch } from '../../../hooks/useDispatch'
import { Route } from './Route'
import { initRoutes } from '../../../store/slices/router'

import { RouteControlProps } from './typings.d'
import { GeoJSONCoordinates } from '../../../typings.d'

export const RouteControl: FC<RouteControlProps> = () => {
  const dispatch = useDispatch()

  const handleSelect = useCallback((e: any) => {
    const target = e.get('target')
    const referencePoints = target.options.get('referencePoints')
    target.deselect()
    target.getParent().collapse()
    
    dispatch(initRoutes({
      routes: referencePoints.map((coordinates: GeoJSONCoordinates, id: number) => ({
        id,
        coordinates,
        name: ''
      }))
    }))
  }, [dispatch])

  return (
    <ListBox data={{ content: "Маршрут" }}>
      <Route
        content="Золотое кольцо Урала"
        articleUrl="https://nashural.ru/article/travel/zolotoe-koltso-urala/"
        descriptionUrl="https://nashural.ru/map/marshrut/zolotoe.txt"
        referencePoints={[
          [56.838011, 60.597465],
          [56.084601, 61.084047],
          [56.204689, 61.50462],
          [56.108969, 61.519272],
          [56.187862, 61.941381],
          [56.468742, 61.617449],
          [56.439498, 61.402904],
          [56.384963, 61.412929],
          [56.451135, 61.516541],
          [56.429041, 61.646707],
          [56.343997, 61.677321]
        ]}
        onSelect={handleSelect}
      />
      <Route
        content="Озеро мертвой воды"
        articleUrl="https://nashural.ru/article/travel/samaya-trudnodostupnaya-dostoprimechatelnost-rossii-i-ozero-mertvoj-vody/"
        descriptionUrl="https://nashural.ru/map/marshrut/ozero-mertvoy-vody.txt"
        referencePoints={[
          [58.01045, 56.229434],
          [60.155265, 56.250662],
          [60.081385, 56.335759],
          [60.457576, 56.459565],
          [60.466692, 56.449469],
          [60.490661, 56.368296]
        ]}
        onSelect={handleSelect}
      />
      <Route
        content="Жигаланские водопады"
        articleUrl="https://nashural.ru/article/travel/zhigalanskie-vodopady-i-plato-kvarkush/"
        descriptionUrl="https://nashural.ru/map/marshrut/zhigalan.txt"
        referencePoints={[
          [58.010450, 56.229434],
          [60.152916, 59.743733],
          [60.194678, 58.848953],
          [60.166944, 58.8025],
          [60.2011, 58.725]
        ]}
        onSelect={handleSelect}
      />
      <Route
        content="В гости к медведю и соколу"
        articleUrl="https://nashural.ru/article/travel/krasnoufimsk-dostoprimechatelnosti-i-marshrut-vyhodnogo-dnya/"
        descriptionUrl="https://nashural.ru/map/marshrut/krasnoufimsk.txt"
        referencePoints={[
          [56.838011, 60.597465],
          [56.617744, 57.770692],
          [56.477222, 57.625278],
          [56.498443, 57.522823]
        ]}
        onSelect={handleSelect}
      />
      <Route
        content="5 чудес Саткинского района"
        articleUrl="https://nashural.ru/article/travel/5-udivitelnyh-mest-satkinskogo-rayona-za-odin-den/"
        descriptionUrl="https://nashural.ru/map/marshrut/satka.txt"
        referencePoints={[
          [55.159897, 61.402554],
          [55.281944, 59.134861],
          [55.138611, 58.726111],
          [55.168984, 58.649972],
          [55.144722, 58.708889],
          [55.149167, 58.699722],
          [55.154744, 58.806639]
        ]}
        onSelect={handleSelect}
      />
    </ListBox>
  )
}
