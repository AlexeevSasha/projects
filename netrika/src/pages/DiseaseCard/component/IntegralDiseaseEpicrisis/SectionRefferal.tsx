import React from "react";
import { IRefferal } from "../../../../common/interfaces/IRefferal";
import { Type, Value } from "../../style/Description";
import { BlockLine } from "../../style/BlockLine";
import moment from "moment";
import { Accordion } from "../../../../common/components/Accordion/Accordion";
import styled from "styled-components";

interface IProps {
  display?: string;
  items?: IRefferal[];
}

export const SectionRefferal: React.FC<IProps> = ({ display = "Направления", items = [] }) => {
  if (!items || !items.length) return null;

  return (
    <Accordion styleContainer={{ marginBottom: 16 }} onlyBorderContent title={display}>
      <Container>
        {items.map((item, i) => (
          <Accordion
            key={i}
            hiddenPadding
            hiddenBorder
            title={`${item.referralType} от ${moment(item.referralIssuedDate).format("DD.MM.YYYY")}`}
          >
            <BlockLine>
              <Type>Тип направления</Type>
              <Value>{item.referralType || "Н/Д"}</Value>
            </BlockLine>
            <BlockLine>
              <Type>Дата выдачи направления</Type>
              <Value>{item.referralIssuedDate ? moment(item.referralIssuedDate).format("DD.MM.YYYY") : "Н/Д"}</Value>
            </BlockLine>
            <BlockLine>
              <Type>Целевая МО</Type>
              <Value>{item.referralTargetOrganization || "Н/Д"}</Value>
            </BlockLine>
            <BlockLine>
              <Type>Направляющая МО</Type>
              <Value>{item.referralSourceOrganization || "Н/Д"}</Value>
            </BlockLine>
            <BlockLine>
              <Type>Уровень срочности</Type>
              <Value>{item.referralOrder || "Н/Д"}</Value>
            </BlockLine>
            <BlockLine>
              <Type>МКБ-код</Type>
              <Value>{item.referralMkb || "Н/Д"}</Value>
            </BlockLine>
            <BlockLine>
              <Type>Причина выдачи направления</Type>
              <Value>{item.referralReason || "Н/Д"}</Value>
            </BlockLine>
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
