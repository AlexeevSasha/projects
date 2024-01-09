import { theme } from "common/styles/theme";
import { selectObjectiveState } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "../../../../common/components/Card/Card";
import { DefaultGroup } from "../DefaultGroup";
import { SectionInstrumentalResearch } from "./AnamnesisOfLife/SectionInstrumentalResearch";
import { SectionLaboratoryDiagnostic } from "./AnamnesisOfLife/SectionLaboratoryDiagnostic";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import styled from "styled-components";
interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardObjectiveState: FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { objectiveState, loadingObjectiveState } = useSelector(selectObjectiveState);

  const isData = useMemo(
    () =>
      !!objectiveState.find((item) => {
        switch (item.name) {
          case "instrumentalResearch": {
            return (
              item.items[0].instrResearch?.length ||
              item.items[0].observations?.length ||
              item.items[0].services?.length
            );
          }
          default:
            return item.items?.length > 0;
        }
      }),
    [objectiveState]
  );

  const openCard = useCallback(() => {
    if (objectiveState.length === 0) {
      dispatch(DiseaseCardEpicrisisThunk.getObjectiveState(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, objectiveState]);
  const render = useMemo(() => {
    return objectiveState.map((item) => {
      switch (item.name) {
        case "observation": {
          return <DefaultGroup style={{ marginBottom: 16 }} items={item.items} />;
        }
        case "laboratoryDiagnostic": {
          return <SectionLaboratoryDiagnostic isPreview={isPreview} items={item.items} display={item.display} />;
        }
        case "instrumentalResearch": {
          return <SectionInstrumentalResearch isPreview={isPreview} instance={item.items[0]} display={item.display} />;
        }
        default:
          return null;
      }
    });
  }, [objectiveState, isPreview]);

  return (
    <Card
      id={"instrumental_research"}
      title={"Объективное состояние"}
      max_height={600}
      isEmpty={!isData}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingObjectiveState ? (
        <IconLoading />
      ) : isData ? (
        <Container>{render}</Container>
      ) : (
        <div style={{ color: theme.colors.opacityGray, marginBottom: "23px" }}>Нет данных</div>
      )}
    </Card>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
