import "./universal.css";
import "./desktop.css";
import "./mobile.css";

import { DESKTOP, MOBILE } from "../../constants/mediaQueries";
import React, { FC } from "react";

import Media from "react-media";
import { ModalProps } from "./typings.d";

export const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <Media
      queries={{ desktop: DESKTOP, mobile: MOBILE }}
      defaultMatches={{ desktop: true }}
    >
      {({ mobile, desktop }) => {
        return (
          <div
            className={`Modal ${desktop ? "desktop" : ""} ${
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
