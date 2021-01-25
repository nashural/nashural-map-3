import { GeoJSONFeature, Group } from "../../typings";
import React, { FC } from "react";

import { Badge } from "./Badge";
import { GroupSearchResultProps } from "./typings.d";
import { SearchResultFeature } from "./SearchResultFeature";
import { selectFeaturesByGroupId } from "../../store/slices/search";
import { selectGroupById } from "../../store/slices/groups";
import { useSelector } from "react-redux";

export const GroupSearchResult: FC<GroupSearchResultProps> = ({ id }) => {
  const { iconHref, name } = useSelector(selectGroupById(id)) as Group;
  const features = useSelector(selectFeaturesByGroupId(id));

  const renderFeature = (feature: GeoJSONFeature) => {
    return <SearchResultFeature key={feature.id} feature={feature} />;
  };

  return (
    <div className="GroupSearchResult">
      <div
        className="Group"
        style={{
          backgroundImage: `URL(${iconHref.replace(
            "/map",
            process.env.PUBLIC_URL || ""
          )})`,
        }}
      >
        {name}
        <Badge count={features.length} />
      </div>
      <div className="GroupSearchResult-features">
        {features.map(renderFeature)}
      </div>
    </div>
  );
};
