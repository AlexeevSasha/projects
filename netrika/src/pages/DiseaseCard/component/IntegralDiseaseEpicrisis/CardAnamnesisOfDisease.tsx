import { theme } from "common/styles/theme";
import { selectAnamnesisOfDisease } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "../../../../common/components/Card/Card";
import { DefaultGroup } from "../DefaultGroup";
import { SectionAppliedMed } from "./AnamnesisOfDisease/SectionAppliedMed";
import { SectionSurgicalIntervention } from "./AnamnesisOfDisease/SectionSurgicalIntervention";
import { SectionTreatment } from "./AnamnesisOfDisease/SectionTreatment";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import styled from "styled-components";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardAnamnesisOfDisease: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { anamnesisOfDisease, loadingAnamnesisOfDisease } = useSelector(selectAnamnesisOfDisease);

  const isData = useMemo(() => !!anamnesisOfDisease.find((item) => item.items?.length), [anamnesisOfDisease]);

  const openCard = useCallback(() => {
    if (anamnesisOfDisease.length === 0) {
      dispatch(DiseaseCardEpicrisisThunk.getAnamnesisOfDisease(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, anamnesisOfDisease]);

  const render = useMemo(() => {
    return anamnesisOfDisease.map((item) => {
      switch (item.name) {
        case "observation": {
          return <DefaultGroup items={item.items} />;
        }
        case "treatmentWithHistory": {
          return <SectionTreatment isPreview={isPreview} items={item.items} display={item.display} />;
        }
        case "surgicalIntervention": {
          return <SectionSurgicalIntervention isPreview={isPreview} items={item.items} display={item.display} />;
        }
        case "appliedMed": {
          return <SectionAppliedMed isPreview={isPreview} items={item.items} display={item.display} />;
        }
        default:
          return null;
      }
    });
  }, [anamnesisOfDisease, isPreview]);

  return (
    <Card
      id={"anamnes_of_desease"}
      title={"Анамнез заболевания"}
      max_height={600}
      isEmpty={!isData}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingAnamnesisOfDisease ? (
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
