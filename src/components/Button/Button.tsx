import "./universal.css";

import React, { FC } from "react";

import { ButtonProps } from "./typings.d";

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  // @ts-ignore
  return <button className={`Button ${className || ""}`} {...props} />;
};
