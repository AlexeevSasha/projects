import React, { useState } from "react";
import { Map, YMaps } from "react-yandex-maps";
import Geocode from "react-geocode";
import { Placemark } from "react-yandex-maps";

Geocode.setApiKey("AIzaSyA2D4lfZO5zaqIO_tsU7beH1iUYLJaw564");
Geocode.setLanguage("ru");
Geocode.setRegion("ru");
Geocode.enableDebug();

export const YaMap = () => {
  const [coords, setCoords] = useState([55.75, 37.61]);

  const handleClick = (e: any) => {
    const nextCoords = e.get("coords");

    setCoords(nextCoords);
    /* Geocode.fromLatLng(...nextCoords).then((response: any) => {
      console.log(response.results[0].formatted_address);
    }); */
  };

  return (
    <div>
      <YMaps>
        <Map
          defaultState={{ center: [55.75, 37.61], zoom: 9 }}
          width="100%"
          onClick={handleClick}
        >
          <Placemark geometry={coords} />
        </Map>
      </YMaps>
    </div>
  );
};
