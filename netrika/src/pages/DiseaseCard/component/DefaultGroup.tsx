import { IDefaultGroupObservationWithHistory } from "common/interfaces/IObservationWithHistory";
import moment from "moment";
import React from "react";
import { BlockLine } from "../style/BlockLine";
import { Type, Value } from "../style/Description";
import styled from "styled-components";
import { Accordion } from "../../../common/components/Accordion/Accordion";
import { getDescriptionDefaultGroup } from "../helpers/getDescriptionDefaultGroup";

interface IProps {
  items: IDefaultGroupObservationWithHistory[];
  updateCard?: () => void;
  isObservation?: boolean;
  style?: React.CSSProperties;
}

export const DefaultGroup = ({ items, isObservation, style }: IProps) => {
  if (!items || !items.length) return null;
  return (
    <Container style={style}>
      {items.map((item, i) => (
        <Accordion
          onlyBorderContent
          key={i}
          hiddenArrow={!item.history || !item.history.length}
          disabledClick={!item.history || !item.history.length}
          title={
            <GeneralInfo>
              <Type>{item.name}</Type>
              <Value>{item.value}</Value>
            </GeneralInfo>
          }
          description={getDescriptionDefaultGroup(item)}
        >
          {isObservation
            ? item?.history?.map((history, index) => (
                <HistoryContainer key={index}>
                  <Type> {history.value || "Нет данных"}</Type>
                  <HistoryDopInfo>
                    <p>{history.documentDate ? moment(history.documentDate).format("DD.MM.YYYY") : "Нет данных"}</p>
                    <p>{history.documentName || "Нет данных"}</p>
                    <p>{history.doctorName || "Нет данных"}</p>
                    <p>{history.lpu || "Нет данных"}</p>
                  </HistoryDopInfo>
                </HistoryContainer>
              ))
            : item?.history?.map((history, index) => (
                <BlockLine key={index}>
                  <Value>{history.value}</Value>
                </BlockLine>
              ))}
        </Accordion>
      ))}
    </Container>
  );
};

const GeneralInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HistoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const HistoryDopInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  text-align: right;
  gap: 8px;

  p {
    margin: 0;
  }
`;
