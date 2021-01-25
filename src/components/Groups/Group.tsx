import "./desktop.css";

import React, { FC, useCallback } from "react";
import {
  fetchGroupById,
  isGroupSelectedById,
  toggleGroup,
} from "../../store/slices/groups";

import { Badge } from "./Badge";
import { GroupProps } from "./typings";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const Group: FC<GroupProps> = ({ id, name, count, iconHref }) => {
  const dispatch = useDispatch();
  const active = useSelector(isGroupSelectedById(id));

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      if (active) {
        dispatch(toggleGroup({ id, on: false }));
      } else {
        dispatch(toggleGroup({ id, on: true }));
        dispatch(fetchGroupById(id));
      }
    },
    [dispatch, active, id]
  );

  return (
    <a
      href={`#${id}`}
      id={id}
      className={`Group ${active ? "active" : ""}`}
      style={{
        backgroundImage: `URL(${iconHref.replace(
          "/map",
          process.env.PUBLIC_URL || ""
        )})`,
      }}
      onClick={handleClick}
    >
      {name}
      <Badge count={count} />
    </a>
  );
};
