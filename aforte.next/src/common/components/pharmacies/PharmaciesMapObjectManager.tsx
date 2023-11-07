import { PharmaciesT } from "modules/profile/interfaces/pharmacies";
import { YMaps, Map, ObjectManager } from "react-yandex-maps";

type Props = {
  pharmacies: PharmaciesT[];
  favourites: PharmaciesT[];
  setObjectId?: (v: string) => void;
};

export const PharmaciesMapObjectManager = ({ pharmacies, favourites, setObjectId }: Props) => {
  const dataConvert = (routes: any) => {
    const features: any = [];
    routes &&
      routes.map((route: any) => {
        const lat = route.lat;
        const lon = route.lon;
        const tmpObj: any = {
          type: "Feature",
          id: route.id,
          geometry: {
            type: "Point",
            coordinates: [lat, lon],
          },
          options: {
            iconLayout: "default#image",
            iconImageHref: favourites.find((item) => item.id === route.id)
              ? "/images/pinHeart.png"
              : "/images/pin.png",
            iconImageSize: favourites.find((item) => item.id === route.id) ? [24, 24] : [16, 16],
          },
        };
        return features.push(tmpObj);
      });
    return features;
  };
  return (
    <YMaps query={{ apikey: "85937b28-7a2e-44aa-8640-7142b7b82f41" }}>
      <Map defaultState={{ center: [55.75, 37.57], zoom: 10 }} width={"100%"} height={"100%"}>
        <ObjectManager
          options={{
            clusterize: false,
            gridSize: 32,
          }}
          features={dataConvert(pharmacies)}
          objects={{
            openBalloonOnClick: true,
            preset: "islands#greenDotIcon",
          }}
          clusters={{
            preset: "islands#redClusterIcons",
          }}
          modules={["objectManager.addon.objectsBalloon", "objectManager.addon.objectsHint"]}
          instanceRef={(ref: any) =>
            ref &&
            ref.objects.events.add("click", (e: any) => {
              // Используем айдишник для того, чтобы далее получить инфу по метке
              const objectId = e.get("objectId");
              setObjectId && setObjectId(ref.objects.getById(objectId).id);
            })
          }
        />
      </Map>
    </YMaps>
  );
};
