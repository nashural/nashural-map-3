import "./universal.css";
import "./desktop.css";
import "./mobile.css";

import { CustomProperties, GeoJSONFeature } from "../../typings.d";
import { DESKTOP, MOBILE } from "../../constants/mediaQueries";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { changeBounds, mapStateSelector } from "../../store/slices/map";

import { DesktopMap } from "./DesktopMap";
import { MapProps } from "./typings.d";
import Media from "react-media";
import { MobileMap } from "./MobileMap";
import { allFeaturesSelector } from "../../store/slices/groups";
import { groupBy } from "lodash";
import { pointsSelector } from "../../store/slices/router";
import { toggleInfo } from "../../store/slices/router";
import { toggleModal } from "../../store/slices/modal";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const Map: FC<MapProps> = () => {
  const dispatch = useDispatch();
  const { center, zoom } = useSelector(mapStateSelector);
  const features = useSelector(allFeaturesSelector);
  const groupedFeatures = useMemo(() => {
    return groupBy(features, (feature: GeoJSONFeature) => {
      return (feature.properties as CustomProperties).group;
    });
  }, [features]);
  const points = useSelector(pointsSelector);

  useEffect(() => {
    if (!points) {
      dispatch(
        toggleInfo({
          show: false,
        })
      );
    }
  }, [dispatch, points]);

  const handlePlacemarkClick = useCallback(
    (feature: GeoJSONFeature) => {
      const {
        iconCaption,
        previewSrc,
        articleHref,
      } = feature.properties as CustomProperties;
      const { coordinates } = feature.geometry;
      dispatch(
        toggleModal({
          on: true,
          name: "placemark",
          props: {
            title: iconCaption,
            src: previewSrc,
            href: articleHref,
            coordinates,
          },
        })
      );
    },
    [dispatch]
  );

  const handleBoundsChange = useCallback(
    (e) => {
      dispatch(
        changeBounds({
          center: e.get("newCenter"),
          zoom: e.get("newZoom"),
        })
      );
    },
    [dispatch]
  );

  return (
    <Media
      queries={{ desktop: DESKTOP, mobile: MOBILE }}
      defaultMatches={{ desktop: true }}
    >
      {({ mobile, desktop }) => {
        if (mobile) {
          return (
            <MobileMap
              center={center}
              zoom={zoom}
              groupedFeatures={groupedFeatures}
              points={points}
              onPlacemarkClick={handlePlacemarkClick}
              onBoundsChange={handleBoundsChange}
            />
          );
        }

        if (desktop) {
          return (
            <DesktopMap
              center={center}
              zoom={zoom}
              groupedFeatures={groupedFeatures}
              points={points}
              onPlacemarkClick={handlePlacemarkClick}
              onBoundsChange={handleBoundsChange}
            />
          );
        }

        return null;
      }}
    </Media>
  );
};
