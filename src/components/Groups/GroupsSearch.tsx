import React, { ChangeEvent, FC, useCallback } from "react";
import { performSearch, querySelector } from "../../store/slices/search";

import { GroupsSearchProps } from "./typings";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "react-redux";

export const GroupsSearch: FC<GroupsSearchProps> = () => {
  const dispatch = useDispatch();
  const query = useSelector(querySelector);

  const handleQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        performSearch({
          query: e.target.value,
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="Groups-search">
      <input
        value={query}
        type="text"
        className="Groups-search__input"
        placeholder="Найти место..."
        onChange={handleQueryChange}
      />
    </div>
  );
};
