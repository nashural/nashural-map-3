import "./universal.css";
import "./desktop.css";
import "./mobile.css";

import {
  CustomProperties,
  GeoJSONCoordinates,
  GeoJSONFeature,
} from "../../typings.d";
import { DESKTOP, MOBILE } from "../../constants/mediaQueries";
import React, { FC, useCallback, useEffect } from "react";
import { changeBounds, mapStateSelector } from "../../store/slices/map";

import { DesktopMap } from "./DesktopMap";
import { MapProps } from "./typings.d";
import Media from "react-media";
import { MobileMap } from "./MobileMap";
import { Placemark } from "react-yandex-maps";
import { allFeaturesSelector } from "../../store/slices/groups";
import { pointsSelector } from "../../store/slices/router";
import { toggleInfo } from "../../store/slices/router";
import { toggleModal } from "../../store/slices/modal";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const Map: FC<MapProps> = () => {
  const dispatch = useDispatch();
  const { center, zoom } = useSelector(mapStateSelector);
  const features = useSelector(allFeaturesSelector);
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
    (e: any, coordinates: GeoJSONCoordinates) => {
      const { iconCaption, previewSrc, articleHref } = e
        .get("target")
        .properties.getAll();
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

  const renderPlacemark = ({ id, geometry, properties }: GeoJSONFeature) => {
    return (
      <Placemark
        key={`${(properties as CustomProperties).group}-${id}`}
        geometry={geometry as any}
        properties={properties}
        options={{
          iconLayout: "default#image",
          iconImageHref: `${process.env.PUBLIC_URL}/icons/${
            (properties as CustomProperties).group
          }.png`,
          iconImageSize: [24, 24],
          iconImageOffset: [-12, -12],
        }}
        onClick={(e: any) => handlePlacemarkClick(e, geometry.coordinates)}
      />
    );
  };

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
              features={features}
              points={points}
              renderPlacemark={renderPlacemark}
              onBoundsChange={handleBoundsChange}
            />
          );
        }

        if (desktop) {
          return (
            <DesktopMap
              center={center}
              zoom={zoom}
              features={features}
              points={points}
              renderPlacemark={renderPlacemark}
              onBoundsChange={handleBoundsChange}
            />
          );
        }

        return null;
      }}
    </Media>
  );
};
