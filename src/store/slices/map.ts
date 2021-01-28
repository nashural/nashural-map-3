import { ChangeBoundsPayload, MapState, RootState } from '../typings'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const DEFAULT_ZOOM: number = 4
const DEFAULT_LAT: number = 64.87185143
const DEFAULT_LON: number = 71.56933550

const createInitialMapState = (): MapState => {
  let zoom: number = DEFAULT_ZOOM
  let lat: number = DEFAULT_LAT
  let lon: number = DEFAULT_LON
  let place: string|void = undefined
  let isInline: boolean = false
  let preselectAllGroups: boolean = false
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

  if (url.searchParams.has('inline')) {
    isInline = url.searchParams.get('inline') === 'true'
  }

  if (Number.isNaN(lat) || Number.isNaN(lon) || Number.isNaN(zoom)) {
    zoom = DEFAULT_ZOOM
    lat = DEFAULT_LAT
    lon = DEFAULT_LON
  }

  if (isInline) {
    preselectAllGroups = true
  }

  return {
    zoom,
    center: [lat, lon],
    place,
    isInline,
    preselectAllGroups
  }
}

export const mapStateSelector = (state: RootState) => ({
  center: state.map.center,
  zoom: state.map.zoom
})

export const placeSelector = (state: RootState) => state.map.place

export const preselectAllGroupsSelector = (state: RootState) => state.map.preselectAllGroups

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
