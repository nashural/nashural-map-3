import "./desktop.css";

import React, { FC } from "react";

import { BadgeProps } from "./typings";

export const Badge: FC<BadgeProps> = ({ count }) => {
  return <div className="Badge">{count}</div>;
};
