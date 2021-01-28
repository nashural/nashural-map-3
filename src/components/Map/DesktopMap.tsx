import "./desktop.css";

import {
  GeolocationControl,
  TypeSelector,
  Map as YMap,
  ZoomControl,
} from "react-yandex-maps";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";

import { DesktopMapProps } from "./typings.d";
import { EditorControl } from "./EditorControl";
import { FeaturesGroup } from "./FeaturesGroup";
import Measure from "react-measure";
import { RegionControl } from "./RegionControl";
import { Route } from "./Route";
import { RouteControl } from "./RouteControl";
import { drawerOpenedSelector } from "../../store/slices/drawer";
import { routerOpenedSelector } from "../../store/slices/router";
import { useSelector } from "react-redux";

export const DesktopMap: FC<DesktopMapProps> = ({
  center,
  zoom,
  groupedFeatures,
  points,
  onBoundsChange,
  onPlacemarkClick,
}) => {
  const mapRef = useRef(null);
  const [bounds, setBounds] = useState({ width: -1, height: -1 });
  const drawerOpened = useSelector(drawerOpenedSelector);
  const routerOpened = useSelector(routerOpenedSelector);
  const drawerFullWidth = useMemo(
    () =>
      parseInt(
        getComputedStyle(document.body).getPropertyValue("--drawer-full-width"),
        10
      ),
    []
  );
  const routerFullWidth = useMemo(
    () =>
      parseInt(
        getComputedStyle(document.body).getPropertyValue("--router-full-width"),
        10
      ),
    []
  );

  const handleResize = useCallback(
    (contentRect: any) => {
      let width = window.innerWidth;
      if (drawerOpened) {
        width -= drawerFullWidth;
      }
      if (routerOpened) {
        width -= routerFullWidth;
      }
      setBounds({
        ...contentRect.client,
        width,
      });
    },
    [drawerOpened, routerOpened, drawerFullWidth, routerFullWidth]
  );

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
    <Measure client onResize={handleResize}>
      {({ measureRef }: any) => {
        return (
          <div className="Map desktop" ref={measureRef}>
            <YMap
              width={bounds.width}
              height={bounds.height}
              state={{ center, zoom }}
              load="geoObject.addon.editor"
              // @ts-ignore
              instanceRef={mapRef}
              onBoundschange={onBoundsChange}
            >
              <EditorControl />
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
      }}
    </Measure>
  );
};
