import "./desktop.css";

import React, { FC } from "react";

import { DesktopHeaderProps } from "./typings.d";
import { Logotype } from "../Logotype";
import { placeSelector } from "../../store/slices/map";
import { useSelector } from "react-redux";

export const DesktopHeader: FC<DesktopHeaderProps> = () => {
  const place = useSelector(placeSelector);

  return (
    <div className="Header dekstop">
      {place ? (
        <div className="Header-place dekstop">{place}</div>
      ) : (
        <Logotype />
      )}
    </div>
  );
};
