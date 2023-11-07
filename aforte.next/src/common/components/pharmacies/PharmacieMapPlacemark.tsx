import { PharmaciesT } from "modules/profile/interfaces/pharmacies";
import { YMaps, Map, Placemark } from "react-yandex-maps";

type Props = {
  pharmacie?: PharmaciesT;
};

export const PharmaciesMapPlacemark = ({ pharmacie }: Props) => {
  return (
    <YMaps>
      <Map defaultState={{ center: [55.7012093, 37.7533436], zoom: 11 }} width={"100%"} height={"100%"}>
        <Placemark
          geometry={[55.7012093, 37.7533436]}
          options={{
            iconLayout: "default#image",
            iconImageHref: "/images/union.png",
            iconImageSize: [48, 48],
            iconColor: "green",
          }}
        />
      </Map>
    </YMaps>
  );
};
