import "./mobile.css";

import React, { FC, useCallback } from "react";

import { OpenGroupsProps } from "./typings.d";
import { drawerOpenedSelector } from "../../store/slices/drawer";
import { toggleDrawer } from "../../store/slices/drawer";
import { toggleRouter } from "../../store/slices/router";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const OpenGroups: FC<OpenGroupsProps> = () => {
  const dispatch = useDispatch();
  const opened = useSelector(drawerOpenedSelector);

  const handleClick = useCallback(() => {
    dispatch(toggleDrawer({ on: !opened }));
    dispatch(toggleRouter({ on: false }));
  }, [dispatch, opened]);

  return (
    <button
      className={`OpenGroups mobile ${opened ? "opened" : ""}`}
      onClick={handleClick}
    >
      {opened ? "Карта" : "Каталог"}
    </button>
  );
};
