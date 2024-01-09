import React from "react";
import { IDefaultGroupObservationWithHistory } from "../../../common/interfaces/IObservationWithHistory";
import { Type, Value } from "../style/Description";
import moment from "moment/moment";
import styled from "styled-components";
import { BlockLine } from "../style/BlockLine";

export const getDescriptionDefaultGroup = (item: IDefaultGroupObservationWithHistory) => {
  const render = [];
  if (item.documentDate) {
    render.push(
      <BlockLineMargin>
        <Type>Дата:</Type>
        <Value>{item.documentDate ? moment(item.documentDate).format("DD.MM.YYYY") : "Нет данных"}</Value>
      </BlockLineMargin>
    );
  }
  if (item.documentName) {
    render.push(
      <BlockLineMargin>
        <Type>Документ:</Type>
        <Value>{item.documentName || "Нет данных"}</Value>
      </BlockLineMargin>
    );
  }
  if (item.doctorName) {
    render.push(
      <BlockLineMargin>
        <Type>Врач:</Type>
        <Value>{item.doctorName || "Нет данных"}</Value>
      </BlockLineMargin>
    );
  }
  if (item.lpu) {
    render.push(
      <BlockLineMargin>
        <Type>ЛПУ:</Type>
        <Value>{item.lpu || "Нет данных"}</Value>
      </BlockLineMargin>
    );
  }

  return render.length ? <Container>{render}</Container> : null;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BlockLineMargin = styled(BlockLine)`
  margin: 8px 0 0;
`;
