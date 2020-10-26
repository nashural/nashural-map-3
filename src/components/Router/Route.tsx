import React, { FC, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import AsyncSelect from 'react-select/async'

import { useDispatch } from '../../hooks/useDispatch'
import { removeRoute, routeSetCoordinates } from '../../store/router'
import { allFeaturesSelector, groupNamesByKeySelector } from '../../store/groups'
import { search, geocode } from '../../api'

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

const geoObjectToFeature = ({ Point, name }: any, id: number): GeoJSONFeature => {
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

export const Route: FC<RouteProps> = ({ id, index }) => {
  const dispatch = useDispatch()
  const groupNames = useSelector(groupNamesByKeySelector)
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

  const defaultOptions = useMemo(() => featuresToOptions(features), [features])

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
      coordinates: o.value.geometry.coordinates
    }))
  }, [dispatch, index])

  return (
    <Draggable draggableId={id} index={index}>{provided => {
      return <div {...provided.draggableProps} ref={provided.innerRef} className="Route">
        <i {...provided.dragHandleProps} className="fa fa-bars Route-draghandle"></i>
        <AsyncSelect
          defaultOptions={defaultOptions}
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
