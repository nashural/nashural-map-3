import { RouteManagerCache } from './typings.d'
import { GeoJSONCoordinates } from '../../typings'

export class RouteManager {
    private ymaps: any
    private mapRef: any
    private cache: RouteManagerCache = {}
    private updateLock: boolean = false
  
    constructor(ymaps: any, mapRef: any) {
      this.ymaps = ymaps
      this.mapRef = mapRef
    }
  
    get map() {
      return this.mapRef.current
    }
  
    hashPoints(points: GeoJSONCoordinates[]) {
      let hash: number = points.length ^ 0xffffff
      for (let [lat, lon] of points) {
        hash ^= lat
        hash ^= lon
      }
      return hash
    }
  
    async getOrCreateRoute(points: GeoJSONCoordinates[]) {
      const hash = this.hashPoints(points)
      if (this.cache[hash]) {
        return this.cache[hash]
      } else {
        const route = await this.ymaps.route(points)
        this.cache[hash] = route
        return route
      }
    }
  
    async update(points: GeoJSONCoordinates[]) {
      if (this.updateLock) {
        return 
      } else {
        this.updateLock = true
        const route = await this.getOrCreateRoute(points)
        const idx = this.map.geoObjects.indexOf(route)
        if (idx === -1) {
          this.map.geoObjects.add(route)
        }
        this.updateLock = false
      }
    }
  
    clear() {
      for (let [hash, route] of Object.entries(this.cache)) {
        this.map.geoObjects.remove(route)
        delete this.cache[hash]
      }
    }
  }