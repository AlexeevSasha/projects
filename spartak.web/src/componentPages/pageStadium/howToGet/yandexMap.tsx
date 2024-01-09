import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import styled from "styled-components";
import { lang } from "../../../../public/locales/lang";
import { IconCar } from "../../../assets/icon/iconCar";
import { IconTrain } from "../../../assets/icon/iconTrain";
import { IconTrainSimple } from "../../../assets/icon/iconTrainSimple";
import { theme } from "../../../assets/theme/theme";
import { ContainerContent } from "../../../components/containers/containerContent";

const transportKinds = [
  { icon: IconCar, key: "car" },
  { icon: IconTrain, key: "train" },
  { icon: IconTrainSimple, key: "trainSimple" },
];

interface IProps {
  coordinates?: { [key: string]: number[] };
  hasPointerContainer?: boolean;
}

export const YandexMap = (props: IProps) => {
  const { locale = "ru" } = useRouter();
  const [active, setActive] = useState<string>("stadium");
  const [coordinate, setCoordinate] = useState<number[] | undefined>(props.coordinates?.stadium);
  const mapState = { center: coordinate, zoom: 16, behaviors: ["default", "scrollZoom"] };

  const setActiveCoordinate = (key: string) => {
    setActive(key);
    setCoordinate(props.coordinates?.[key]);
  };

  const transportButtons = useMemo(
    () =>
      transportKinds
        .filter((elem) => Object.keys(props.coordinates || {}).includes(elem.key)) // убирает лишние кнопки, если их нет в списке координат
        .map((elem) => (
          <Pointer active={active === elem.key} key={elem.key} onClick={() => setActiveCoordinate(elem.key)}>
            <elem.icon />
            <span>{lang[locale].pageHowToGet.transportKinds[elem.key]}</span>
          </Pointer>
        )),
    [active]
  );

  const getPointData = (index: number[] | undefined) => {
    return {
      balloonContentBody: "placemark <strong>balloon " + index + "</strong>",
      clusterCaption: "placemark <strong>" + index + " </strong>",
    };
  };

  const getPointOptions = () => {
    return {
      preset: "islands#redIcon",
    };
  };

  return (
    <>
      <MapContainer>
        <YMaps>
          <StyledMap state={mapState} modules={["multiRouter.MultiRoute"]}>
            <Placemark geometry={coordinate} properties={getPointData(coordinate)} options={getPointOptions()} />
          </StyledMap>
        </YMaps>
      </MapContainer>

      <PointerContainer visible={props.hasPointerContainer}>{transportButtons}</PointerContainer>
    </>
  );
};

const MapContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: auto;
  height: 31.25vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    height: 65.19vw;
  }

  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    height: 64vw;
  }
`;

const StyledMap = styled(Map)`
  mix-blend-mode: luminosity;
  height: 100%;
`;

const PointerContainer = styled(ContainerContent)<{ visible?: boolean }>`
  justify-content: start;
  gap: 1.25vw;
  padding: 2.08vw 0 0;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    padding: 3.13vw 0 0;
    gap: 3.13vw;
    overflow: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    padding: 6.4vw 0 0;
    gap: 6.4vw;
  }
`;
const Pointer = styled.p<{ active: boolean }>`
  background-color: ${({ active, theme }) => (active ? theme.colors.white_whiteGray : "transparent")};
  cursor: pointer;
  display: flex;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  color: ${({ active, ...props }) => (active ? theme.colors.red : props.theme.colors.white_black)};
  border: 1px solid ${({ active, theme }) => (active ? theme.colors.white_red : theme.colors.white_black)};
  margin: 0;
  font-family: "FCSM Text", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 50px;
  font-size: 0.73vw;
  padding: 0 1.2vw;

  @media screen and (max-width: ${theme.rubberSize.desktop}) {
    font-size: 1.83vw;
    padding: 0 3vw;
  }
  @media screen and (max-width: ${theme.rubberSize.tablet}) {
    font-size: 3.73vw;
    padding: 0 6.13vw;
  }

  svg {
    path {
      stroke: ${({ active, ...props }) => (active ? theme.colors.red : props.theme.colors.white_black)};
    }
  }

  span {
    padding: 0.63vw 0 0.63vw 0.42vw;
    @media screen and (max-width: ${theme.rubberSize.desktop}) {
      padding: 1.56vw 0 1.56vw 1.04vw;
    }
    @media screen and (max-width: ${theme.rubberSize.tablet}) {
      padding: 3.2vw 0 3.2vw 2.13vw;
    }
  }
`;
