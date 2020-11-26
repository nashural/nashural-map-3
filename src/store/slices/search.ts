import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { search } from '../../api/search'

import {
  RootState,
  SearchState,
  PerformSearchPayload,
  ToggleEnabledPayload
} from '../typings'

export const querySelector = (state: RootState) => state.search.query

export const enabledSelector = (state: RootState) => state.search.enabled

export const groupsSelector = (state: RootState) => Object.keys(state.search.groupedFeatures)

export const selectFeaturesByGroupId = (groupId: string) => (state: RootState) => state.search.groupedFeatures[groupId]

export const performSearch = createAsyncThunk(
  'perform-search',
  async ({ query }: PerformSearchPayload, thunkAPI) => {
    if (query) {
      thunkAPI.dispatch(toggleEnabled({ on: true }))
      const results = await search(query)
      return { query, results } as PerformSearchPayload
    } else {
      thunkAPI.dispatch(toggleEnabled({ on: false }))
      return { query }
    }
  }
)

const initialState: SearchState = {
  enabled: false,
  query: '',
  groupedFeatures: {}
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    toggleEnabled(state, action: PayloadAction<ToggleEnabledPayload>) {
      const { on } = action.payload
      if (on) {
        state.enabled = true
      } else {
        state.enabled = false
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(performSearch.pending, (state, action) => {
      state.query = action.meta.arg.query
    })
    builder.addCase(performSearch.fulfilled, (state, action: PayloadAction<PerformSearchPayload>) => {
      if (action.payload.results) {
        state.groupedFeatures = {}
        state.enabled = true
        for (let { groupId, features } of action.payload.results) {
          state.groupedFeatures[groupId] = features
        }
      } else {
        state.enabled = false
      }
    })
  }
})

export const { toggleEnabled } = searchSlice.actions

export default searchSlice.reducer
