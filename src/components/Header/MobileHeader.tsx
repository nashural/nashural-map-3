import "./mobile.css";

import React, { FC } from "react";

import { Logotype } from "../Logotype";
import { MobileHeaderProps } from "./typings.d";
import { OpenGroups } from "./OpenGroups";
import { OpenRouter } from "./OpenRouter";
import { placeSelector } from "../../store/slices/map";
import { useSelector } from "react-redux";

export const MobileHeader: FC<MobileHeaderProps> = () => {
  const place = useSelector(placeSelector);

  return (
    <div className="Header mobile">
      <OpenGroups />
      {place ? (
        <div className="Header-place mobile">{place}</div>
      ) : (
        <Logotype />
      )}
      <OpenRouter />
    </div>
  );
};
