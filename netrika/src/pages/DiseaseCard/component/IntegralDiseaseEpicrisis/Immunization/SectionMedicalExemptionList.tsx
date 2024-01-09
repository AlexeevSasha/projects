import moment from "moment";
import React, { FC } from "react";
import { Type, Value } from "../../../style/Description";
import { IMedicalExemptionList } from "../../../../../common/interfaces/medical/IMedicalExemptionList";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";
import { getSortByDate } from "../../../helpers/getSortByDate";

interface IProps {
  display: string;
  items: IMedicalExemptionList[];
  isPreview?: boolean;
}

export const SectionMedicalExemptionList: FC<IProps> = ({
  display = "Медицинские отводы пациента",
  items = [],
  isPreview,
}) => {
  if (!items || !items.length) return null;

  return (
    <Accordion isActive={isPreview} onlyBorderContent title={display}>
      <Container>
        {getSortByDate(items, "dateEnd")?.map((item, i) => (
          <Accordion
            isActive={isPreview && !i}
            key={i}
            onlyBorderContent
            title={`(${item.infCode || ""}) - ${item.infDisplay}`}
          >
            <Container>
              <Content key={i}>
                <Type>Начало действия медотвода</Type>
                <Value>{item.dateStart ? moment(item.dateStart).format("DD.MM.YYYY") : "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Окончание действия медотвода</Type>
                <Value>{item.dateEnd ? moment(item.dateEnd).format("DD.MM.YYYY") : "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Тип отвода</Type>
                <Value>{item.type || "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Причина отвода</Type>
                <Value>{item.reason || "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Код заболевания по МКБ-10</Type>
                <Value>{item.disease || "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Врач</Type>
                <Value>{item.doctorName || "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Статус</Type>
                <Value>{item.status || "Нет данных"}</Value>
              </Content>
            </Container>
          </Accordion>
        ))}
      </Container>
    </Accordion>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
