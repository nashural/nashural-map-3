import React, { FC } from "react";

import { RouteInfoProps } from "./typings.d";
import { routeInfoSelector } from "../../store/slices/router";
import { useSelector } from "react-redux";

export const RouteInfo: FC<RouteInfoProps> = () => {
  const info = useSelector(routeInfoSelector);

  if (info.show) {
    return (
      <div className="RouteInfo">
        <div>
          <b>Длина маршрута:</b> {info.humanLength}
        </div>
        <div>
          <b>Расход топлива:</b> {info.humanFuel}
        </div>
        <div>
          <b>Время в пути:</b> {info.humanJamsTime}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
