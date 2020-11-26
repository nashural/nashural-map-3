import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { Group, GeoJSON, CustomProperties, GeoJSONFeature } from '../../typings'
import {
  RootState,
  GroupsState,
  ToggleGroupPayload,
  GroupNamesIndex,
  AddFeaturePayload,
  RemoveFeaturePayload
} from '../typings'

const isFeaturesSame = (featureA: GeoJSONFeature, featureB: GeoJSONFeature): boolean => {
  return (featureA.id === featureB.id) && ((featureA.properties as CustomProperties).group === (featureB.properties as CustomProperties).group)
}

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

export const featureIsActiveByKeySelector = (key: string) => (state: RootState) => {
  for (let { id, properties } of state.groups.features) {
    const { group } = properties as CustomProperties
    if (key === `${group}-${id}`)
      return true
  }
  return false
}

export const selectGroupById = (groupId: string) => (state: RootState) => {
  for (let group of state.groups.allGroups) {
    if (group.id === groupId)
      return group
  }
  return undefined
}

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

const mergeFeatures = (state: any, id: string) => {
  const features = state.features.slice(0)

  for (let newFeature of state.groups[id].features) {
    const index = features.findIndex((presentFeature: GeoJSONFeature) => isFeaturesSame(newFeature, presentFeature))
    if (index === -1) {
      features.push(newFeature)
    }
  }

  return features
}

const removeFeatures = (state: any, id: string) => {
  return state.features.filter((feature_: GeoJSONFeature) => {
    for (let feature of state.groups[id].features) {
      if (isFeaturesSame(feature, feature_)) {
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
    },
    addFeature(state, action: PayloadAction<AddFeaturePayload>) {
      const { feature } = action.payload
      state.features.push(feature)
    },
    removeFeature(state, action: PayloadAction<RemoveFeaturePayload>) {
      const index = state.features.findIndex((feature: GeoJSONFeature) => {
        if (isFeaturesSame(feature, action.payload.feature)) {
          return true
        }
      })
      if (index >= -1) state.features.splice(index, 1)
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGroups.fulfilled, (state, action:PayloadAction<Group[]>) => {
      state.allGroups = action.payload
    })
    builder.addCase(fetchGroupById.fulfilled, (state, action:PayloadAction<GeoJSON>) => {
      state.groups[action.payload.metadata.id] = action.payload
      state.features = mergeFeatures(state, action.payload.metadata.id)
    })
  }
})

export const { toggleGroup, addFeature, removeFeature } = groupsSlice.actions

export default groupsSlice.reducer
