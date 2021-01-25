import React, { FC } from "react";

import { Group } from "../../typings.d";
import { Group as GroupItem } from "./Group";
import { GroupsListProps } from "./typings.d";
import { allGroupsSelector } from "../../store/slices/groups";
import { useSelector } from "react-redux";

export const GroupsList: FC<GroupsListProps> = () => {
  const groups = useSelector(allGroupsSelector);

  const renderGroup = (group: Group) => {
    return <GroupItem key={group.id} {...group} />;
  };

  return <div className="Groups-list">{groups.map(renderGroup)}</div>;
};
