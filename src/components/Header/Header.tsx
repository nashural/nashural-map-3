import "./universal.css";

import { DESKTOP, MOBILE } from "../../constants/mediaQueries";
import React, { FC } from "react";

import { DesktopHeader } from "./DesktopHeader";
import { HeaderProps } from "./typings";
import Media from "react-media";
import { MobileHeader } from "./MobileHeader";

export const Header: FC<HeaderProps> = () => {
  return (
    <Media
      queries={{ mobile: MOBILE, desktop: DESKTOP }}
      defaultMatches={{ desktop: true }}
    >
      {({ mobile, desktop }) => {
        if (mobile) {
          return <MobileHeader />;
        }

        if (desktop) {
          return <DesktopHeader />;
        }

        return null;
      }}
    </Media>
  );
};
