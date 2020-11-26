import React, { FC, useCallback, ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from '../../hooks/useDispatch'
import { querySelector, performSearch } from '../../store/slices/search'

import { GroupsSearchProps } from './typings'

export const GroupsSearch: FC<GroupsSearchProps> = () => {
  const dispatch = useDispatch()
  const query = useSelector(querySelector)

  const handleQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(performSearch({
      query: e.target.value
    }))
  }, [])

  return (
    <div className="Groups-search">
      <input
        value={query}
        type="text"
        className="Groups-search__input"
        placeholder="Найти место..."
        onChange={handleQueryChange}
      />
    </div>
  )
}
