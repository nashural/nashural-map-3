import {
  GeolocationControl,
  TypeSelector,
  Map as YMap,
  ZoomControl,
} from "react-yandex-maps";
import React, { FC, useMemo, useRef } from "react";

import { FeaturesGroup } from "./FeaturesGroup";
import { MobileMapProps } from "./typings.d";
import { RegionControl } from "./RegionControl";
import { Route } from "./Route";
import { RouteControl } from "./RouteControl";
import { useWindowSize } from "@react-hook/window-size";

export const MobileMap: FC<MobileMapProps> = ({
  center,
  zoom,
  groupedFeatures,
  points,
  onBoundsChange,
  onPlacemarkClick,
}) => {
  const mapRef = useRef(null);
  const [width, height_] = useWindowSize();
  const headerHeight = useMemo(
    () =>
      parseInt(
        getComputedStyle(document.body).getPropertyValue("--header-height"),
        10
      ),
    []
  );
  const height = height_ - headerHeight;

  const featureGroupsEls = useMemo(() => {
    return Object.entries(groupedFeatures).map(([groupId, features]) => {
      return (
        <FeaturesGroup
          key={groupId}
          groupId={groupId}
          features={features}
          onPlacemarkClick={onPlacemarkClick}
        />
      );
    });
  }, [groupedFeatures, onPlacemarkClick]);

  return (
    <div className="Map mobile">
      <YMap
        width={width}
        height={height}
        state={{ center, zoom }}
        load="geoObject.addon.editor"
        // @ts-ignore
        instanceRef={mapRef}
        onBoundschange={onBoundsChange}
      >
        <RegionControl />
        <RouteControl />
        <GeolocationControl />
        <TypeSelector />
        <ZoomControl />
        {featureGroupsEls}
        {points ? <Route mapRef={mapRef} points={points} /> : null}
      </YMap>
    </div>
  );
};
