import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { Group } from '../typings.d'

const groupsSorter = (id1: string, id2: string): number => {
  return id1.localeCompare(id2)
}

// @ts-ignore
export const allGroupsSelector = state => state.groups.allGroups

// @ts-ignore
export const groupNamesByKeySelector = state => {
  return state.groups.allGroups.reduce((groups: any, { id, name }: Group) => ({
    ...groups,
    [id]: name
  }), {})
}

// @ts-ignore
export const groupsSelector = state => state.groups.groups

// @ts-ignore
export const isGroupSelectedById = id => state => Boolean(state.groups.selectedGroups[id])

// @ts-ignore
export const allFeaturesSelector = state => state.groups.features

export const fetchGroups = createAsyncThunk(
  'fetch-groups',
  async () => {
    const resp = await fetch('/data/groups.json')
    const data = await resp.json()
    return data.groups
  }
)

export const fetchGroupById = createAsyncThunk(
  'fetch-group-by-id',
  async (id: string) => {
    const resp = await fetch (`/data/${id}.json`)
    return await resp.json()
  }
)

const addFeatures = (state: any, id: string) => {
  const { features } = state.groups[id]

  return state.features.concat(features)
}

const removeFeatures = (state: any, id: string) => {
  return state.features.filter((feature_: any) => {
    for (let feature of state.groups[id].features) {
      if ((feature.id === feature_.id) && (feature.properties.group === feature_.properties.group)) {
        return false
      }
    }
    return true
  })
}

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: {},
    allGroups: [],
    selectedGroups: {},
    activeGroups: [],
    features: []
  },
  reducers: {
    // @ts-ignore
    toggleGroup(state, action) {
      const { id, on } = action.payload
      if (on) {
        // @ts-ignore
        state.activeGroups.push(id)
        state.activeGroups.sort(groupsSorter)
        // @ts-ignore
        state.selectedGroups[id] = true
      } else {
        const idx = state.activeGroups.findIndex(id_ => id === id_)
        state.activeGroups.splice(idx, 1)
        state.activeGroups.sort(groupsSorter)
        // @ts-ignore
        state.selectedGroups[id] = false
        state.features = removeFeatures(state, id)
      }
    }
  },
  extraReducers: {
    // @ts-ignore
    [fetchGroups.fulfilled](state, action) {
      state.allGroups = action.payload
    },
    // @ts-ignore
    [fetchGroupById.fulfilled](state, action) {
      // @ts-ignore
      state.groups[action.payload.metadata.id] = action.payload
      state.features = addFeatures(state, action.payload.metadata.id)
    }
  }
})

export const { toggleGroup } = groupsSlice.actions

export default groupsSlice.reducer
