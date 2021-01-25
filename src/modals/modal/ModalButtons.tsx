import "./desktop.css";

import React, { FC } from "react";

import { ModalButtonsProps } from "./typings.d";

export const ModalButtons: FC<ModalButtonsProps> = ({ children }) => {
  return <div className="Modal-buttons">{children}</div>;
};
