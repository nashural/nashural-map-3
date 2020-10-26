import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState, MapState, ChangeBoundsPayload } from '../typings'

const DEFAULT_ZOOM: number = 3
const DEFAULT_LAT: number = 63.815612726572821
const DEFAULT_LON: number = 74.7998273699998

const createInitialMapState = (): MapState => {
  let zoom: number = DEFAULT_ZOOM
  let lat: number = DEFAULT_LAT
  let lon: number = DEFAULT_LON
  let place: string|void = undefined
  const url = new URL(window.location.href)

  if (
    url.searchParams.has('lat')
    && url.searchParams.has('lon')
    && url.searchParams.has('zoom')
    && url.searchParams.has('place')
  ) {
    lat = Number(url.searchParams.get('lat'))
    lon = Number(url.searchParams.get('lon'))
    zoom = Number(url.searchParams.get('zoom'))
    place = url.searchParams.get('place') as string
  }

  if (Number.isNaN(lat) || Number.isNaN(lon) || Number.isNaN(zoom)) {
    zoom = DEFAULT_ZOOM
    lat = DEFAULT_LAT
    lon = DEFAULT_LON
  }

  return {
    zoom,
    center: [lat, lon],
    place
  }
}

export const mapStateSelector = (state: RootState) => ({
  center: state.map.center,
  zoom: state.map.zoom
})

export const placeSelector = (state: RootState) => state.map.place

const mapSlice = createSlice({
  name: 'map',
  initialState: createInitialMapState(),
  reducers: {
    changeBounds(state, action: PayloadAction<ChangeBoundsPayload>) {
      const { center, zoom } = action.payload
      state.center = center
      state.zoom = zoom
    }
  }
})

export const { changeBounds } = mapSlice.actions

export default mapSlice.reducer
