import moment from "moment";
import React, { FC } from "react";
import { Type, Value } from "../../../style/Description";
import { IVaccinationList } from "../../../../../common/interfaces/IVaccinationList";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";
import { getSortByDate } from "../../../helpers/getSortByDate";

interface IProps {
  display: string;
  items: IVaccinationList[];
  isPreview: boolean;
}

export const SectionVaccinationList: FC<IProps> = ({ display = "Вакцинация", items = [], isPreview }) => {
  if (!items || !items.length) return null;

  return (
    <Accordion isActive={isPreview} onlyBorderContent title={display}>
      <Container>
        {getSortByDate(items, "date")?.map((item, i) => (
          <Accordion isActive={isPreview && !i} onlyBorderContent key={i} title={`(${item.code}) - ${item.display}`}>
            <Container>
              <Content key={i}>
                <Type>Дата вакцинации</Type>
                <Value>{item.date ? moment(item.date).format("DD.MM.YYYY") : "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Вид вакцинации</Type>
                <Value>{item.type || "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>ЛПУ</Type>
                <Value>{item.lpu || "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Врач</Type>
                <Value>{item.doctorName || "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Статус проведения вакцинации</Type>
                <Value>{item.status || "Нет данных"}</Value>
              </Content>
              <Content key={i}>
                <Type>Инфекция, от котороой защищает вакцина</Type>
                <Value>{item.infDisplay || "Нет данных"}</Value>
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
