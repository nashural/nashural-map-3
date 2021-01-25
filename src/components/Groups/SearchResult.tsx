import React, { FC } from "react";

import { GroupSearchResult } from "./GroupSearchResult";
import { SearchResultProps } from "./typings.d";
import { groupsSelector } from "../../store/slices/search";
import { useSelector } from "react-redux";

export const SearchResult: FC<SearchResultProps> = () => {
  const groups = useSelector(groupsSelector);

  const renderGroup = (groupId: string) => {
    return <GroupSearchResult key={groupId} id={groupId} />;
  };

  return <div className="Groups-list">{groups.map(renderGroup)}</div>;
};
