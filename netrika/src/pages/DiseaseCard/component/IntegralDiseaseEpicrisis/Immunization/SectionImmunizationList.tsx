import moment from "moment";
import React, { FC } from "react";
import { Type, Value } from "../../../style/Description";
import { IImmunizationList } from "../../../../../common/interfaces/IImmunizationList";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";
import { getSortByDate } from "../../../helpers/getSortByDate";

interface IProps {
  display: string;
  items: IImmunizationList[];
  isPreview: boolean;
}

export const SectionImmunizationList: FC<IProps> = ({ display = "Иммунизация", items = [], isPreview }) => {
  if (!items || !items.length) return null;

  return (
    <Accordion isActive={isPreview} onlyBorderContent title={display}>
      <Container>
        {getSortByDate(items, "date")?.map((item, i) => (
          <Accordion
            isActive={isPreview && !i}
            key={i}
            onlyBorderContent
            title={`(${item.infCode || ""}) - ${item.infDisplay}`}
          >
            <Container>
              <Content>
                <Type>Дата следующей явки</Type>
                <Value>{item.date ? moment(item.date).format("DD.MM.YYYY") : "Нет данных"}</Value>
              </Content>
              <Content>
                <Type>Тип мероприятия иммунизации</Type>
                <Value>{item.type || "Нет данных"}</Value>
              </Content>
              <Content>
                <Type>Вид вакцинации</Type>
                <Value>{item.vacType || "Нет данных"}</Value>
              </Content>
              <Content>
                <Type>Врач</Type>
                <Value>{item.doctorName || "Нет данных"}</Value>
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
