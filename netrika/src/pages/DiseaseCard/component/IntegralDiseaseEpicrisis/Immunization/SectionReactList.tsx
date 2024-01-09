import moment from "moment";
import React, { FC } from "react";
import { Type, Value } from "../../../style/Description";
import { IReactList } from "../../../../../common/interfaces/IReactList";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";
import { getSortByDate } from "../../../helpers/getSortByDate";

interface IProps {
  display: string;
  items: IReactList[];
  isPreview: boolean;
}

export const SectionReactList: FC<IProps> = ({ display = "Пробы пациента", items = [], isPreview }) => {
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
                <Type>Тип пробы</Type>
                <Value>{item.type || "Нет данных"}</Value>
              </Content>
              <Content>
                <Type>Дата выполнения пробы</Type>
                <Value>{item.date ? moment(item.date).format("DD.MM.YYYY") : "Нет данных"}</Value>
              </Content>
              <Content>
                <Type>Проба</Type>
                <Value>{item.display || "Нет данных"}</Value>
              </Content>
              <Content>
                <Type>Статус</Type>
                <Value>{item.status || "Нет данных"}</Value>
              </Content>
              <Content>
                <Type>ЛПУ, в котором проводилась проба</Type>
                <Value>{item.lpu || "Нет данных"}</Value>
              </Content>
              <Content style={{ margin: 0 }}>
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
