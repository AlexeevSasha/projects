import { theme } from "common/styles/theme";
import { selectAnamnesisOfLife } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "../../../../common/components/Card/Card";
import { DefaultGroup } from "../DefaultGroup";
import { SectionInstrumentalResearch } from "./AnamnesisOfLife/SectionInstrumentalResearch";
import { SectionLaboratoryDiagnostic } from "./AnamnesisOfLife/SectionLaboratoryDiagnostic";
import { SectionMedicalCareCase } from "./AnamnesisOfLife/SectionMedicalCareCase";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import styled from "styled-components";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardAnamnesisOfLife: FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { anamnesisOfLife, loadingAnamnesisOfLife } = useSelector(selectAnamnesisOfLife);

  const isData = useMemo(
    () =>
      !!anamnesisOfLife.find((item) => {
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
    [anamnesisOfLife]
  );

  const openCard = useCallback(() => {
    if (anamnesisOfLife.length === 0) {
      dispatch(DiseaseCardEpicrisisThunk.getAnamnesisOfLife(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, anamnesisOfLife]);

  const render = useMemo(() => {
    return anamnesisOfLife.map((item) => {
      switch (item.name) {
        case "observation": {
          return <DefaultGroup style={{ marginBottom: 16 }} items={item.items} />;
        }
        case "medicalCareCase": {
          return <SectionMedicalCareCase items={item.items} display={item.display} />;
        }
        case "instrumentalResearch": {
          return <SectionInstrumentalResearch isPreview={isPreview} instance={item.items[0]} display={item.display} />;
        }
        case "laboratoryDiagnostic": {
          return <SectionLaboratoryDiagnostic isPreview={isPreview} items={item.items} display={item.display} />;
        }
        default:
          return null;
      }
    });
  }, [anamnesisOfLife, isPreview]);

  return (
    <Card
      id={"anamnesis_of_life"}
      title={"Анамнез жизни"}
      max_height={600}
      isEmpty={!isData}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingAnamnesisOfLife ? (
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
