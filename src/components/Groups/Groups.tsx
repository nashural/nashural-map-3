import "./universal.css";
import "./desktop.css";
import "./mobile.css";

import { DESKTOP, MOBILE } from "../../constants/mediaQueries";
import React, { FC, useEffect } from "react";

import { GroupsList } from "./GroupsList";
import { GroupsProps } from "./typings.d";
import { GroupsSearch } from "./GroupsSearch";
import Media from "react-media";
import { SearchResult } from "./SearchResult";
import { enabledSelector } from "../../store/slices/search";
import { fetchGroups } from "../../store/slices/groups";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const Groups: FC<GroupsProps> = () => {
  const dispatch = useDispatch();
  const enabled = useSelector(enabledSelector);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <Media
      queries={{ desktop: DESKTOP, mobile: MOBILE }}
      defaultMatches={{ desktop: true }}
    >
      {({ desktop, mobile }) => {
        return (
          <div
            className={`Groups ${mobile ? "mobile" : ""} ${desktop ? "desktop" : ""}`}
          >
            <GroupsSearch />
            {enabled ? <SearchResult /> : <GroupsList />}
          </div>
        );
      }}
    </Media>
  );
};
