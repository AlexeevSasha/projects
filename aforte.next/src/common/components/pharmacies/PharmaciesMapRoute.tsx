import { useRef, useState } from "react";
import { YMaps, Map } from "react-yandex-maps";

type Props = {
  userLocation?: number[];
};

export const PharmaciesMapRoute = ({ userLocation }: Props) => {
  const [ymaps, setYmaps] = useState<any>(null);
  const routes = useRef(null);

  const getRoute = (ref: any) => {
    if (ymaps) {
      const multiRoute = new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [userLocation, [55.7012093, 37.7533436]],
          // Параметры маршрутизации.
          params: {
            // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
            results: 2,
          },
        },
        {
          // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
          boundsAutoApply: true,
          // Внешний вид линии маршрута.
          routeActiveStrokeWidth: 6,
          routeActiveStrokeColor: "#5383C7",
        }
      );
      // Кладем полученный маршрут в переменную
      routes.current = multiRoute;
      ref.geoObjects.add(multiRoute);
    }
  };

  return (
    <YMaps query={{ apikey: "85937b28-7a2e-44aa-8640-7142b7b82f41" }}>
      <Map
        defaultState={{ center: [55.75, 37.57], zoom: 11 }}
        width={"100%"}
        height={"100%"}
        modules={["multiRouter.MultiRoute"]}
        onLoad={(ymaps) => setYmaps(ymaps)}
        instanceRef={(ref) => ref && getRoute(ref)}
      ></Map>
    </YMaps>
  );
};
