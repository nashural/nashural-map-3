import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_ZOOM = 3
const DEFAULT_LAT = 63.815612726572821
const DEFAULT_LON = 74.7998273699998

const createInitialMapState = () => {
  let zoom: number = DEFAULT_ZOOM
  let lat: number = DEFAULT_LAT
  let lon: number = DEFAULT_LON
  let place: string|null = null
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
    place = url.searchParams.get('place')
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

// @ts-ignore
export const mapStateSelector = state => ({
  center: state.map.center,
  zoom: state.map.zoom
})

// @ts-ignore
export const placeSelector = state => state.map.place

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    ...createInitialMapState()
  },
  reducers: {
    changeBounds(state, action) {
      const { center, zoom } = action.payload
      state.center = center
      state.zoom = zoom
    }
  },
  extraReducers: {
  }
})

export const { changeBounds } = mapSlice.actions

export default mapSlice.reducer
