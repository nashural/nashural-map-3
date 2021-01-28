import { ObjectManager, ObjectManagerFeatures } from "react-yandex-maps";
import React, { useCallback } from "react";

import { FC } from "react";
import { FeaturesGroupProps } from "./typings.d";
import { GeoJSONFeature } from "../../typings";

export const FeaturesGroup: FC<FeaturesGroupProps> = ({
  groupId,
  features,
  onPlacemarkClick,
}) => {
  const handleClick = useCallback(
    (e: any) => {
      const objectId = e.get("objectId");
      const featureIdx = features.findIndex(
        ({ id }: GeoJSONFeature) => id === objectId
      );
      const feature = features[featureIdx];
      onPlacemarkClick(feature);
    },
    [features, onPlacemarkClick]
  );

  return (
    <ObjectManager
      features={features as ObjectManagerFeatures}
      objects={{
        iconLayout: "default#image",
        iconImageHref: `${process.env.PUBLIC_URL}/icons/${groupId}.png`,
        iconImageSize: [24, 24],
        iconImageOffset: [-12, -12],
      }}
      onClick={handleClick}
    />
  );
};
