import React, { FC, useCallback } from "react";
import { ReferencePoint, RouteControlProps } from "./typings.d";

import { ListBox } from "react-yandex-maps";
import { Route } from "./Route";
import { initRoutes } from "../../../store/slices/router";
import { useDispatch } from "../../../hooks/useDispatch";

export const RouteControl: FC<RouteControlProps> = () => {
  const dispatch = useDispatch();

  const handleSelect = useCallback(
    async (e: any) => {
      const target = e.get("target");
      const referencePoints: ReferencePoint[] = target.options.get(
        "referencePoints"
      );
      target.deselect();
      target.getParent().collapse();

      dispatch(
        initRoutes({
          routes: referencePoints.map(([name, coordinates], id: number) => ({
            id: `${id}`,
            coordinates,
            name,
          })),
        })
      );
    },
    [dispatch]
  );

  return (
    <ListBox data={{ content: "Маршрут" }}>
      <Route
        content="Золотое кольцо Урала"
        articleUrl="https://nashural.ru/article/travel/zolotoe-koltso-urala/"
        descriptionUrl="https://nashural.ru/map/marshrut/zolotoe.txt"
        referencePoints={[
          ["Екатеринбург", [56.838011, 60.597465]],
          ["село Булзи", [56.084601, 61.084047]],
          ["село Багаряк", [56.204689, 61.50462]],
          ["село Огневское", [56.108969, 61.519272]],
          ["село Окулово", [56.187862, 61.941381]],
          ["село Покровское", [56.468742, 61.617449]],
          ["село Маминское", [56.439498, 61.402904]],
          ["село Троицкое", [56.384963, 61.412929]],
          ["село Исетское", [56.451135, 61.516541]],
          ["село Смолинское", [56.429041, 61.646707]],
          ["село Рыбниковское", [56.343997, 61.677321]],
        ]}
        onSelect={handleSelect}
      />
      <Route
        content="Озеро мертвой воды"
        articleUrl="https://nashural.ru/article/travel/samaya-trudnodostupnaya-dostoprimechatelnost-rossii-i-ozero-mertvoj-vody/"
        descriptionUrl="https://nashural.ru/map/marshrut/ozero-mertvoy-vody.txt"
        referencePoints={[
          ["г. Пермь", [58.01045, 56.229434]],
          ["село Пянтег", [60.155265, 56.250662]],
          ["село Лимеж", [60.081385, 56.335759]],
          ["село Покча", [60.457576, 56.459565]],
          ["село Покча", [60.466692, 56.449469]],
          ["Чердынский ГО", [60.490661, 56.368296]],
        ]}
        onSelect={handleSelect}
      />
      <Route
        content="Жигаланские водопады"
        articleUrl="https://nashural.ru/article/travel/zhigalanskie-vodopady-i-plato-kvarkush/"
        descriptionUrl="https://nashural.ru/map/marshrut/zhigalan.txt"
        referencePoints={[
          ["г. Пермь", [58.01045, 56.229434]],
          ["Североуральский ГО", [60.152916, 59.743733]],
          ["Красновишерский ГО", [60.194678, 58.848953]],
          ["Красновишерский ГО", [60.166944, 58.8025]],
          ["Красновишерский ГО", [60.2011, 58.725]],
        ]}
        onSelect={handleSelect}
      />
      <Route
        content="В гости к медведю и соколу"
        articleUrl="https://nashural.ru/article/travel/krasnoufimsk-dostoprimechatelnosti-i-marshrut-vyhodnogo-dnya/"
        descriptionUrl="https://nashural.ru/map/marshrut/krasnoufimsk.txt"
        referencePoints={[
          ["г. Екатеринбург", [56.838011, 60.597465]],
          ["г. Красноуфимск", [56.617744, 57.770692]],
          ["МО Красноуфимский округ", [56.477222, 57.625278]],
          ["ГО Красноуфимск", [56.498443, 57.522823]],
        ]}
        onSelect={handleSelect}
      />
      <Route
        content="5 чудес Саткинского района"
        articleUrl="https://nashural.ru/article/travel/5-udivitelnyh-mest-satkinskogo-rayona-za-odin-den/"
        descriptionUrl="https://nashural.ru/map/marshrut/satka.txt"
        referencePoints={[
          ["г. Челябинск", [55.159897, 61.402554]],
          ["Саткинский р-н", [55.281944, 59.134861]],
          ["Саткинский р-н", [55.138611, 58.726111]],
          ["Кигинский р-н", [55.168984, 58.649972]],
          ["Саткинский р-н", [55.144722, 58.708889]],
          ["Саткинский р-н", [55.149167, 58.699722]],
          ["ПГТ Межевой", [55.154744, 58.806639]],
        ]}
        onSelect={handleSelect}
      />
    </ListBox>
  );
};
