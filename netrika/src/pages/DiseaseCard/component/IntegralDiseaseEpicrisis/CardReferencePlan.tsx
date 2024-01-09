import { theme } from "common/styles/theme";
import { selectReferencePlan } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "../../../../common/components/Card/Card";
import { DefaultGroup } from "../DefaultGroup";
import { SectionSurgicalIntervention } from "./AnamnesisOfDisease/SectionSurgicalIntervention";
import { SectionInstrumentalResearch } from "./AnamnesisOfLife/SectionInstrumentalResearch";
import { SectionLaboratoryDiagnostic } from "./AnamnesisOfLife/SectionLaboratoryDiagnostic";
import { SectionMedicine } from "./ReferencePlan/SectionMedicine";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import styled from "styled-components";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}
export const CardReferencePlan: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { referencePlan, loadingReferencePlan } = useSelector(selectReferencePlan);

  const isData = useMemo(
    () =>
      !!referencePlan.find((item) => {
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
    [referencePlan]
  );

  const openCard = useCallback(() => {
    if (referencePlan.length === 0) {
      dispatch(DiseaseCardEpicrisisThunk.getReferencePlan(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, referencePlan]);

  const render = useMemo(() => {
    return referencePlan.map((item) => {
      switch (item.name) {
        case "observation": {
          return <DefaultGroup items={item.items} />;
        }
        case "surgicalIntervention": {
          return <SectionSurgicalIntervention isPreview={isPreview} items={item.items} display={item.display} />;
        }
        case "medicine": {
          return <SectionMedicine isPreview={isPreview} items={item.items} display={item.display} />;
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
  }, [referencePlan, isPreview]);

  return (
    <Card
      id={"reference_plan"}
      title={"План ведения пациента"}
      max_height={600}
      isEmpty={!isData}
      overflowY={"scroll"}
      onClick={openCard}
    >
      {loadingReferencePlan ? (
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
