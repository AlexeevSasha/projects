import { theme } from "common/styles/theme";
import React, { FC } from "react";
import styled from "styled-components";
import { IMedicalCareCase } from "../../../../common/interfaces/medical/IMedicalCareCase";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { Card } from "../../../../common/components/Card/Card";
import { BorderGreen } from "../../style/BorderGreen";
import { getIconCareCase } from "../../helpers/getIconDisaese";
import { MedCareCaseIconContainer } from "../IntegralDiseaseEpicrisis/MedicalCareCase";

interface IProps {
  medicalCareCase: IMedicalCareCase;
}

export const MedicalCareCaseCardGeneralInfo: FC<IProps> = ({ medicalCareCase }) => (
  <Card id={"general_info"} title={"Общие сведения"} close={true}>
    {!Object.keys(medicalCareCase).length ? (
      <IconLoading />
    ) : (
      <BorderGreen>
        <Row>
          {medicalCareCase.period}
          <StyledMedCareCaseIconContainer calendarType={medicalCareCase.calendarCaseType}>
            {getIconCareCase(medicalCareCase.calendarCaseType)}
          </StyledMedCareCaseIconContainer>
        </Row>
        <Row>
          <LeftCollumn>ЛПУ:</LeftCollumn>
          <RightCollumn>{medicalCareCase.caseLpu}</RightCollumn>
        </Row>
        <Row>
          <LeftCollumn>Тип СМО:</LeftCollumn>
          <RightCollumn>{medicalCareCase.caseTypeName ?? "Не указан"}</RightCollumn>
        </Row>
        {!!medicalCareCase.diagnoses?.length && (
          <>
            <Row>Диагнозы:</Row>{" "}
            {medicalCareCase.diagnoses?.map((d, index) => (
              <BorderGreen key={index}>
                <Row>
                  <LeftCollumn>Диагноз:</LeftCollumn>
                  <RightCollumn>{d?.diagnoseName}</RightCollumn>
                </Row>
                <Row>
                  <LeftCollumn>Тип:</LeftCollumn>
                  <RightCollumn>{d?.diagnoseType}</RightCollumn>
                </Row>
                <Row>
                  <LeftCollumn>Стадия:</LeftCollumn>
                  <RightCollumn>{d?.diagnoseState}</RightCollumn>
                </Row>
              </BorderGreen>
            ))}
          </>
        )}
      </BorderGreen>
    )}
  </Card>
);

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
const LeftCollumn = styled.p`
  flex-basis: 15%;
  margin: 0;

  color: ${theme.colors.hightBlue};
`;
const RightCollumn = styled.p`
  flex-basis: 85%;
  margin: 0;
`;

const StyledMedCareCaseIconContainer = styled(MedCareCaseIconContainer)`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  padding: 0;
`;
