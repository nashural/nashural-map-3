import React, { FC, useCallback } from "react";
import {
  addFeature,
  featureIsActiveByKeySelector,
  removeFeature,
} from "../../store/slices/groups";

import { CustomProperties } from "../../typings.d";
import { SearchResultFeatureProps } from "./typings.d";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const SearchResultFeature: FC<SearchResultFeatureProps> = ({
  feature,
}) => {
  const dispatch = useDispatch();
  const properties = feature.properties as CustomProperties;
  const key = `${properties.group}-${feature.id}`;
  const active = useSelector(featureIsActiveByKeySelector(key));

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      if (active) {
        dispatch(removeFeature({ feature }));
      } else {
        dispatch(addFeature({ feature }));
      }
    },
    [dispatch, feature, active]
  );

  return (
    <a
      href={`#${key}`}
      id={key}
      className={`GroupSearchResult-feature ${active ? "active" : ""}`}
      onClick={handleClick}
    >
      {properties.iconCaption}
    </a>
  );
};
