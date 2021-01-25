import React, { FC } from "react";

import { ListBoxItem } from "react-yandex-maps";
import { RegionProps } from "./typings.d";

export const Region: FC<RegionProps> = ({
  content,
  center,
  zoom,
  onSelect,
}) => {
  return (
    <ListBoxItem
      data={{ content }}
      options={{ center, zoom }}
      onSelect={onSelect}
    />
  );
};
