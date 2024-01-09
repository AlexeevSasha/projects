import { IDiagnoseBase } from "common/interfaces/IDiagnoseBase";
import { theme } from "common/styles/theme";
import React, { FC } from "react";
import styled from "styled-components";
import { BaseItem } from "../../TriggerBlock/BaseItem";
import { DocumentItem } from "../../TriggerBlock/DocumentItem";
import moment from "moment";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";

interface IProps {
  diagnose: IDiagnoseBase;
  collapse?: boolean;
  rightCol?: boolean;
  isActiveAccordion?: boolean;
}

export const SectionBaseDiagnose: FC<IProps> = ({ diagnose, rightCol, isActiveAccordion }) => {
  const { diagnosis, diagnosisStatus, diagnosisComment, observations, diagnosisParams } = diagnose;

  return (
    <>
      <Container>
        <LeftColumn>
          <NameParam style={{ fontWeight: "bold" }}>{diagnosis}</NameParam>
          <NameParam>{diagnosisComment}</NameParam>
          <NameParam>
            {diagnose.diagnosisType} {diagnosisStatus === "0" ? "" : diagnosisStatus}
          </NameParam>
          {diagnosisStatus === "Подозрение снято" && <Cross />}
        </LeftColumn>

        {rightCol && (
          <RightColumn>
            <div>{diagnose.lpu}</div>
            <div>{diagnose.doctorName}</div>
            {diagnose.fromSms && <div style={{ fontWeight: "bold" }}>(СЭМД)</div>}
          </RightColumn>
        )}
      </Container>
      <AccordionContainer>
        {!!diagnose?.diagnosisParams?.length && (
          <Accordion isActive={isActiveAccordion} size={"sm"} title={"Параметры диагноза"}>
            {diagnosisParams?.map((item, i) => (
              <BaseItem key={`${item.name}${i}`} name={item.name} value={item.value} />
            ))}
          </Accordion>
        )}

        {(diagnose?.dispensaryState || diagnose?.dispensaryDateStart || diagnose?.dispensaryDateEnd) && (
          <Accordion isActive={isActiveAccordion} size={"sm"} title={"Диспансерное наблюдение"}>
            {diagnose?.dispensaryState && (
              <BaseItem name={"Статус диспансерного наблюдения"} value={diagnose?.dispensaryState} />
            )}
            {diagnose?.dispensaryDateStart && (
              <BaseItem
                name={"Дата начала диспансерного наблюдения"}
                value={moment(diagnose?.dispensaryDateStart).format("DD MMMM YYYY")}
              />
            )}
            {diagnose?.dispensaryDateEnd && (
              <BaseItem
                name={"Дата окончания диспансерного наблюдения"}
                value={moment(diagnose?.dispensaryDateEnd).format("DD MMMM YYYY")}
              />
            )}
          </Accordion>
        )}

        {!!diagnose?.documents?.length && (
          <Accordion isActive={isActiveAccordion} size={"sm"} title={"Документы"}>
            {diagnose.documents.map((item, i) => (
              <DocumentItem key={`${diagnose.diagnosisName}_${item.documentName}_${i}`} document={item} />
            ))}
          </Accordion>
        )}

        {!!diagnose?.observations?.length && (
          <Accordion isActive={isActiveAccordion} size={"sm"} title={"Дополнительные параметры"}>
            {observations?.map((item, i) => (
              <BaseItem key={`${item.name}${i}`} name={item.name} value={item.value} />
            ))}
          </Accordion>
        )}
      </AccordionContainer>
    </>
  );
};

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Container = styled.div`
  display: grid;
  grid: auto / 2fr 1fr;
  grid-gap: 15px;
  margin: 10px 0 5px 0;

  &:first-child {
    margin-top: 0;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
  position: relative;
`;

const RightColumn = styled.div`
  display: flex;
  flex-flow: column;
  text-align: end;
`;

const Cross = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 10px;

  &::before,
  &::after {
    display: block;
    content: "";
    transform: rotate(8deg);
    border-top: 1px solid ${theme.colors.lightRed};
    position: relative;
    top: 50%;
  }

  &::after {
    transform: rotate(-8deg);
  }
`;

const NameParam = styled.span`
  color: ${theme.colors.black};
`;
