import "./universal.css";
import "./desktop.css";
import "./mobile.css";

import { DESKTOP, MOBILE } from "../../constants/mediaQueries";
import React, { FC, useEffect, useMemo } from "react";

import { AppProps } from "./typings.d";
import { Groups } from "../Groups";
import { Header } from "../Header";
import { Map } from "../Map";
import Media from "react-media";
import { Router } from "../Router";
import { drawerOpenedSelector } from "../../store/slices/drawer";
import { fetchAndSelectAllGroups } from "../../store/slices/groups";
import { preselectAllGroupsSelector } from "../../store/slices/map";
import { routerOpenedSelector } from "../../store/slices/router";
import { toggleDrawer } from "../../store/slices/drawer";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const App: FC<AppProps> = () => {
  const dispatch = useDispatch();
  const drawerOpened = useSelector(drawerOpenedSelector);
  const routerOpened = useSelector(routerOpenedSelector);
  const preselectAllGroups = useSelector(preselectAllGroupsSelector);
  const { matches: mobile } = useMemo(() => window.matchMedia(MOBILE), []);

  useEffect(() => {
    if (mobile) dispatch(toggleDrawer({ on: false }));
  }, [dispatch, mobile]);

  useEffect(() => {
    if (preselectAllGroups) {
      dispatch(fetchAndSelectAllGroups());
    }
  }, [preselectAllGroups, dispatch]);

  return (
    <Media queries={{ mobile: MOBILE, desktop: DESKTOP }}>
      {({ mobile, desktop }: { mobile: boolean; desktop: boolean }) => {
        return (
          <div
            className={`App ${drawerOpened ? "drawer" : ""} ${
              routerOpened ? "router" : ""
            } ${desktop ? "desktop" : ""} ${mobile ? "mobile" : ""}`}
          >
            <Header />
            <Groups />
            <Map />
            <Router />
          </div>
        );
      }}
    </Media>
  );
};
