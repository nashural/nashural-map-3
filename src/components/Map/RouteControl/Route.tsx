import React, { FC } from "react";

import { ListBoxItem } from "react-yandex-maps";
import { RouteProps } from "./typings.d";

export const Route: FC<RouteProps> = ({
  content,
  articleUrl,
  descriptionUrl,
  referencePoints,
  onSelect,
}) => {
  return (
    <ListBoxItem
      data={{ content }}
      options={{ articleUrl, descriptionUrl, referencePoints }}
      onSelect={onSelect}
    />
  );
};
