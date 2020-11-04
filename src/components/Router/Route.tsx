import React, { FC, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import AsyncSelect from 'react-select/async'
import { groupBy } from 'lodash'

import { useDispatch } from '../../hooks/useDispatch'
import { removeRoute, routeSetCoordinates } from '../../store/slices/router'
import { allFeaturesSelector, groupNamesByKeySelector, activeGroupsSelector } from '../../store/slices/groups'
import { search, geocode } from '../../api'
import { GroupNamesIndex } from '../../store/typings.d'

import { RouteProps } from './typings.d'
import { GeoJSONFeature, CustomProperties, GeoJSONCoordinates } from '../../typings.d'

import './desktop.css'

const featuresToOptions = (features: GeoJSONFeature[]): object[] => {
  return features.map((feature: GeoJSONFeature) => ({
    value: feature,
    label: (feature.properties as CustomProperties).iconCaption
  }))
}

const parsePos = (pos: string): GeoJSONCoordinates => pos.split(' ').map(Number) as GeoJSONCoordinates

const geoObjectToFeature = ({ Point }: any, id: number): GeoJSONFeature => {
  return {
    type: 'Feature',
    id,
    geometry: {
      type: 'Point',
      coordinates: parsePos(Point.pos)
    },
    properties: {}
  }
}

const featuresToOptionsGroups = (features: GeoJSONFeature[], activeGroups: string[], groupNames: GroupNamesIndex): object[] => {
  const featuresByGroups = groupBy(features, (feature: GeoJSONFeature): string => (feature.properties as CustomProperties).group)
  return activeGroups
    .filter((groupId: string): boolean => {
      if (featuresByGroups[groupId]) {
        return featuresByGroups[groupId].length >= 1
      } else {
        return false
      }
    })
    .map((groupId: string): object => {
      return {
        label: groupNames[groupId],
        options: featuresToOptions(featuresByGroups[groupId])
      }
    })
}

export const Route: FC<RouteProps> = ({ id, name, immutable, index }) => {
  const dispatch = useDispatch()
  const groupNames = useSelector(groupNamesByKeySelector)
  const activeGroups = useSelector(activeGroupsSelector)
  const features = useSelector(allFeaturesSelector)

  const searchResultToOptionGroups = useMemo(() => ({ groupId, features }: { groupId: string, features: GeoJSONFeature[] }) => {
    return {
      label: groupNames[groupId],
      options: featuresToOptions(features)
    }
  }, [groupNames])

  const geocoderResultToOptionGroups = useMemo(() => ({ GeoObjectCollection }: any) => {
    return {
      label: 'Населенные пункты',
      options: GeoObjectCollection.featureMember.map(({ GeoObject }: any, idx: number) => ({
        value: geoObjectToFeature(GeoObject, idx),
        label: GeoObject.name
      }))
    }
  }, [])
  
  const handleRemove = useCallback(() => {
    dispatch(removeRoute({
      index
    }))
  }, [dispatch, index])

  const defaultOptions = useMemo(
    () => featuresToOptionsGroups(features, activeGroups, groupNames),
    [features, activeGroups, groupNames]
  )

  const handleSearch = useCallback(async (searchPrefix: string) => {
    const optionGroups = []

    const [searchResults, geocoderResults] = await Promise.all([
      search(searchPrefix),
      geocode(searchPrefix)
    ])

    optionGroups.push(geocoderResultToOptionGroups(geocoderResults))
    optionGroups.push(...searchResults.map(searchResultToOptionGroups))

    return optionGroups
  }, [searchResultToOptionGroups, geocoderResultToOptionGroups])

  const handleSelect = useCallback((o: any) => {
    dispatch(routeSetCoordinates({
      index,
      name: o.label,
      coordinates: o.value.geometry.coordinates
    }))
  }, [dispatch, index])

  return (
    <Draggable draggableId={id} index={index}>{provided => {
      return <div {...provided.draggableProps} ref={provided.innerRef} className="Route">
        <i {...provided.dragHandleProps} className="fa fa-bars Route-draghandle"></i>
        <AsyncSelect
          key={`${id}-${name}`}
          defaultInputValue={name}
          defaultOptions={defaultOptions}
          isDisabled={immutable}
          loadOptions={handleSearch}
          onChange={handleSelect}
          className="Route-select"
        />
        <button onClick={handleRemove} className="Route-remove-btn">
          <i className="fa fa-times"></i>
        </button>
      </div>
    }}</Draggable>
  )
}
