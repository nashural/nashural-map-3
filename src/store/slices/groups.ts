import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { Group, GeoJSON } from '../../typings'
import { RootState, GroupsState, ToggleGroupPayload, GroupNamesIndex } from '../typings'

const groupsSorter = (id1: string, id2: string): number => {
  return id1.localeCompare(id2)
}

export const allGroupsSelector = (state: RootState) => state.groups.allGroups

export const groupNamesByKeySelector = (state: RootState): GroupNamesIndex => {
  return state.groups.allGroups.reduce((groups: GroupNamesIndex, { id, name }: Group) => ({
    ...groups,
    [id]: name
  }), {})
}

export const groupsSelector = (state: RootState) => state.groups.groups

export const isGroupSelectedById = (id: string) => (state: RootState) => !!(state.groups.selectedGroups[id])

export const allFeaturesSelector = (state: RootState) => state.groups.features

export const activeGroupsSelector = (state: RootState) => state.groups.activeGroups

export const fetchGroups = createAsyncThunk(
  'fetch-groups',
  async () => {
    const resp = await fetch(`${process.env.PUBLIC_URL || ''}/data/groups.json`)
    const data = await resp.json()
    return data.groups as Group[]
  }
)

export const fetchGroupById = createAsyncThunk(
  'fetch-group-by-id',
  async (id: string) => {
    const resp = await fetch(`${process.env.PUBLIC_URL || ''}/data/${id}.json`)
    return await resp.json() as GeoJSON
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

const initialState: GroupsState = {
  groups: {},
  allGroups: [],
  selectedGroups: {},
  activeGroups: [],
  features: []
}

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    toggleGroup(state, action: PayloadAction<ToggleGroupPayload>) {
      const { id, on } = action.payload
      if (on) {
        state.activeGroups.push(id)
        state.activeGroups.sort(groupsSorter)
        state.selectedGroups[id] = true
      } else {
        const idx = state.activeGroups.findIndex(id_ => id === id_)
        state.activeGroups.splice(idx, 1)
        state.activeGroups.sort(groupsSorter)
        state.selectedGroups[id] = false
        state.features = removeFeatures(state, id)
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchGroups.fulfilled, (state, action:PayloadAction<Group[]>) => {
      state.allGroups = action.payload
    })
    builder.addCase(fetchGroupById.fulfilled, (state, action:PayloadAction<GeoJSON>) => {
      state.groups[action.payload.metadata.id] = action.payload
      state.features = addFeatures(state, action.payload.metadata.id)
    })
  }
})

export const { toggleGroup } = groupsSlice.actions

export default groupsSlice.reducer
