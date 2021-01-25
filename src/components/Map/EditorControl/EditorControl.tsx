import React, { FC, useCallback } from "react";

import { Button } from "react-yandex-maps";
import { EditorControlProps } from "./typings.d";
import { routerOpenedSelector } from "../../../store/slices/router";
import { toggleRouter } from "../../../store/slices/router";
import { useDispatch } from "../../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const EditorControl: FC<EditorControlProps> = () => {
  const dispatch = useDispatch();
  const routerOpened = useSelector(routerOpenedSelector);

  const handleSelect = useCallback(() => {
    dispatch(toggleRouter({ on: true }));
  }, [dispatch]);

  const handleDeselect = useCallback(() => {
    dispatch(toggleRouter({ on: false }));
  }, [dispatch]);

  return (
    <Button
      data={{ content: "Редактор маршрута" }}
      state={{ selected: routerOpened }}
      onSelect={handleSelect}
      onDeselect={handleDeselect}
    />
  );
};
