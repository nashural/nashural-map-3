import "./universal.css"

import React, { FC } from 'react'

import { GroupsHeaderProps } from './typings.d'
import { GroupsSearch } from "./GroupsSearch";

export const GroupsHeader: FC<GroupsHeaderProps> = () => {
  return (
    <div className="GroupsHeader">
      <GroupsSearch />
    </div>
  )
}
