import "./universal.css";
import "./desktop.css";
import "./mobile.css";

import { DESKTOP, MOBILE } from "../../constants/mediaQueries";
import React, { FC } from "react";

import { LogotypeProps } from "./typings.d";
import Media from "react-media";

export const Logotype: FC<LogotypeProps> = () => {
  return (
    <Media
      queries={{ mobile: MOBILE, desktop: DESKTOP }}
      defaultMatches={{ desktop: true }}
    >
      {({ mobile, desktop }) => {
        return (
          <a
            href="//nashural.ru"
            className={`Logotype ${mobile ? "mobile" : ""} ${
              desktop ? "desktop" : ""
            }`}
          >
            <img
              src={`${process.env.PUBLIC_URL || ""}/img/map-logo.png`}
              alt="Наш Урал"
              width={35}
              height={35}
            />
          </a>
        );
      }}
    </Media>
  );
};
