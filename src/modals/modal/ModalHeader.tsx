import "./desktop.css";

import { DESKTOP, MOBILE } from "../../constants/mediaQueries";
import React, { FC } from "react";

import Media from "react-media";
import { ModalHeaderProps } from "./typings.d";

export const ModalHeader: FC<ModalHeaderProps> = ({ children }) => {
  return (
    <Media
      queries={{ desktop: DESKTOP, mobile: MOBILE }}
      defaultMatches={{ desktop: true }}
    >
      {({ mobile, desktop }) => {
        return (
          <div
            className={`Modal-header ${desktop ? "desktop" : ""} ${
              mobile ? "mobile" : ""
            }`}
          >
            {children}
          </div>
        );
      }}
    </Media>
  );
};
