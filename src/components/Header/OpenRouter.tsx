import "./mobile.css";

import React, { FC, useCallback } from "react";

import { OpenRouterProps } from "./typings.d";
import { routerOpenedSelector } from "../../store/slices/router";
import { toggleDrawer } from "../../store/slices/drawer";
import { toggleRouter } from "../../store/slices/router";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const OpenRouter: FC<OpenRouterProps> = () => {
  const dispatch = useDispatch();
  const opened = useSelector(routerOpenedSelector);

  const handleClick = useCallback(() => {
    dispatch(toggleRouter({ on: !opened }));
    dispatch(toggleDrawer({ on: false }));
  }, [dispatch, opened]);

  return (
    <button
      className={`OpenRouter mobile ${opened ? "opened" : ""}`}
      onClick={handleClick}
    >
      {opened ? "Карта" : "Маршрут"}
    </button>
  );
};
