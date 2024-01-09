import React, { useCallback } from "react";
import { Card } from "../../../../../common/components/Card/Card";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import { FlexContainer } from "../../../../../common/ui/FlexContainer";
import { RouteInfo } from "./RouteVIMIS/RouteInfo";
import { useDispatch, useSelector } from "react-redux";
import { selectPatientRout } from "../../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import { IconLoading } from "../../../../../common/components/Icon/IconLoading";
import { theme } from "../../../../../common/styles/theme";
import { DiseaseCardEpicrisisThunk } from "../../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { useCurrentRoute } from "../../../hooks/useCurrentRoute";
import { RoutePoint } from "./RouteVIMIS/RoutePoint/RoutePoint";
import styled from "styled-components";

interface IProps {
  registerId: string;
  patientId: string;
}

export const CardRouteVIMIS: React.FC<IProps> = ({ registerId, patientId }) => {
  const dispatch = useDispatch();
  const { patientRoute, loadingPatientRoute } = useSelector(selectPatientRout);

  const { isData, optionsGraphs, onChangeGraph, currentGraph, currentRoute } = useCurrentRoute();

  const openCard = useCallback(async () => {
    if (!!patientRoute?.length) {
      await dispatch(DiseaseCardEpicrisisThunk.getPatientRoute(Number(registerId), patientId));
    }
    await dispatch(DiseaseCardEpicrisisThunk.getPatientRoute(Number(registerId), patientId));
  }, [registerId, patientId, dispatch, patientRoute]);

  return (
    <Card
      id={"routeVIMIS"}
      title={"Маршрут ВИМИС"}
      max_height={900}
      min_height={isData ? 300 : 100}
      overflowY={"scroll"}
      isEmpty={false}
      onClick={openCard}
      contentWrapperStyle={{ display: "flex", overflow: "hidden", justifyContent: "center" }}
      contentStyle={{ display: "flex", flexDirection: "column", overflow: "hidden", width: "100%" }}
    >
      {loadingPatientRoute ? (
        <IconLoading />
      ) : isData ? (
        <>
          <FlexContainer direction="column" alignItems="stretch" style={{ marginBottom: "20px", maxWidth: "40%" }}>
            <CustomSelect
              options={optionsGraphs}
              htmlID={"select_routeVIMIS"}
              SelectValue={currentGraph}
              onChange={onChangeGraph}
              maxMenuHeight={230}
            />
          </FlexContainer>

          {currentRoute ? (
            <div>
              <RouteInfo
                graphName={currentRoute?.graphName}
                occasionBeginOn={currentRoute?.occasionBeginOn}
                docNumber={currentRoute?.docNumber}
                nosologyName={currentRoute?.nosologyName}
                nosologyCode={currentRoute?.nosologyCode}
                occasionEndOn={currentRoute?.occasionEndOn}
              />
              {currentRoute?.routeMarkup && (
                <RouteContainer
                  dangerouslySetInnerHTML={{
                    __html: currentRoute?.routeMarkup?.replace(
                      /((font-family|font-weight|font-style):.+[^;];|@import url\(.+[^)]\);)/g,
                      ""
                    ),
                  }}
                />
              )}
            </div>
          ) : (
            <TextBlock>Выберите маршрут</TextBlock>
          )}

          {currentRoute && <RoutePoint route={currentRoute} />}
        </>
      ) : (
        <TextBlock>Нет данных</TextBlock>
      )}
    </Card>
  );
};

const RouteContainer = styled.div`
  overflow-x: scroll;
  margin: 10px 0;
  max-height: 400px;
  min-height: 200px;
  border-radius: 10px;
  overflow-y: auto;
  border: 1px solid ${theme.colors.green};
  padding: 5px;
`;
const TextBlock = styled.h1`
  align-items: center;
  margin-top: 70px;
  align-self: center;
  color: ${theme.colors.opacityGray};
`;
