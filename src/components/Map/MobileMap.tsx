import {
  GeolocationControl,
  TypeSelector,
  Map as YMap,
  ZoomControl,
} from "react-yandex-maps";
import React, { FC, useMemo, useRef } from "react";

import { MobileMapProps } from "./typings.d";
import { RegionControl } from "./RegionControl";
import { Route } from "./Route";
import { RouteControl } from "./RouteControl";
import { useWindowSize } from "@react-hook/window-size";

export const MobileMap: FC<MobileMapProps> = ({
  center,
  zoom,
  features,
  points,
  renderPlacemark,
  onBoundsChange,
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
        {features.map(renderPlacemark)}
        {points ? <Route mapRef={mapRef} points={points} /> : null}
      </YMap>
    </div>
  );
};
