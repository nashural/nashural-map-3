import React, { FC, useCallback } from "react";

import { ListBox } from "react-yandex-maps";
import { Region } from "./Region";
import { RegionControlProps } from "./typings.d";

export const RegionControl: FC<RegionControlProps> = () => {
  const handleSelect = useCallback((e: any) => {
    const target = e.get("target");
    const center = target.options.get("center");
    const zoom = target.options.get("zoom");
    target.deselect();
    target.getParent().collapse();
    target.getMap().setCenter(center, zoom);
  }, []);

  return (
    <ListBox data={{ content: "Регион" }}>
      <Region
        content="Свердловская область"
        center={[56.788798012365895, 60.60339449999997]}
        zoom={8}
        onSelect={handleSelect}
      />
      <Region
        content="Челябинская область"
        center={[55.15336244294198, 61.39169750000001]}
        zoom={8}
        onSelect={handleSelect}
      />
      <Region
        content="Пермский край"
        center={[58.022828084279496, 56.2294204999999]}
        zoom={8}
        onSelect={handleSelect}
      />
      <Region
        content="Республика Башкоркостан"
        center={[54.72865424420519, 56.03041250000002]}
        zoom={8}
        onSelect={handleSelect}
      />
      <Region
        content="Тюменская область"
        center={[57.13726820596636, 65.54499550000001]}
        zoom={8}
        onSelect={handleSelect}
      />
      <Region
        content="Курганская область"
        center={[55.53770385539929, 65.34536249999998]}
        zoom={8}
        onSelect={handleSelect}
      />
      <Region
        content="Оренбургская область"
        center={[51.79419446027598, 55.197472000000005]}
        zoom={8}
        onSelect={handleSelect}
      />
      <Region
        content="Ханты-Мансийский АО"
        center={[61.00186891215746, 69.061886]}
        zoom={8}
        onSelect={handleSelect}
      />
      <Region
        content="Республика Коми"
        center={[61.737126163603676, 50.825394]}
        zoom={8}
        onSelect={handleSelect}
      />
      <Region
        content="Ямало-Ненецкий АО"
        center={[66.57161669007381, 66.61538300000002]}
        zoom={8}
        onSelect={handleSelect}
      />
    </ListBox>
  );
};
