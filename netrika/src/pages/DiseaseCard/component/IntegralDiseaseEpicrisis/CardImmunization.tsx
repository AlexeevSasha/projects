import { theme } from "common/styles/theme";
import { selectImmunization } from "module/diseaseCardEpicrisis/diseaseCardEpicrisisSelector";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconLoading } from "common/components/Icon/IconLoading";
import { Card } from "../../../../common/components/Card/Card";
import { DiseaseCardEpicrisisThunk } from "../../../../module/diseaseCardEpicrisis/diseaseCardEpicrisisThunk";
import { SectionVaccinationList } from "./Immunization/SectionVaccinationList";
import { SectionImmunizationList } from "./Immunization/SectionImmunizationList";
import { SectionReactList } from "./Immunization/SectionReactList";
import { SectionMedicalExemptionList } from "./Immunization/SectionMedicalExemptionList";
import styled from "styled-components";

interface IProps {
  registerId: string;
  patientId: string;
  isPreview: boolean;
}

export const CardImmunization: React.FC<IProps> = ({ registerId, patientId, isPreview }) => {
  const dispatch = useDispatch();
  const { immunization, loadingImmunization } = useSelector(selectImmunization);

  const isData = useMemo(
    () => Object.keys(immunization).length !== 0 && Object.values(immunization).filter((el) => el.length).length !== 0,
    [immunization]
  );

  const openCard = useCallback(() => {
    if (Object.keys(immunization).length === 0 && immunization.constructor === Object) {
      dispatch(DiseaseCardEpicrisisThunk.getImmunization(Number(registerId), patientId));
    }
  }, [registerId, patientId, dispatch, immunization]);

  const render = useMemo(() => {
    return Object.entries(immunization).map(([key, value]) => {
      switch (key) {
        case "vaccinationList": {
          return <SectionVaccinationList isPreview={isPreview} display="Вакцинация" items={value} />;
        }
        case "immunizationList": {
          return <SectionImmunizationList isPreview={isPreview} display="Иммунизация" items={value} />;
        }
        case "reactList": {
          return <SectionReactList isPreview={isPreview} display="Пробы пациента" items={value} />;
        }
        case "medicalExemptionList": {
          return (
            <SectionMedicalExemptionList isPreview={isPreview} display="Медицинские отводы пациента" items={value} />
          );
        }
        default:
          return null;
      }
    });
  }, [immunization, isPreview]);

  return (
    <Card id={"immunization"} title={"Иммунизация"} max_height={600} overflowY={"scroll"} onClick={openCard}>
      {loadingImmunization ? (
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
  gap: 10px;
`;
