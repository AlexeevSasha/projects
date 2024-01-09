import { IServiceInterventionWithHistory } from "common/interfaces/IServiceInterventionWithHistory";
import moment from "moment";
import React, { FC } from "react";
import { BlockLine } from "../../../../style/BlockLine";
import { Type, Value } from "../../../../style/Description";
import { Accordion } from "../../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";
import { getValidDate } from "../../../../helpers/getValidDate";

interface IProps {
  items: IServiceInterventionWithHistory[];
}

export const SurgicalInterventionGroup: FC<IProps> = ({ items }) => {
  if (!items || !items.length) return null;
  return (
    <>
      {items.map((item, i) => (
        <Accordion
          onlyBorderContent
          hiddenArrow={!item.surgicalHistory || !item.surgicalHistory.length}
          disabledClick={!item.surgicalHistory || !item.surgicalHistory.length}
          key={i}
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Type>{item.name}</Type>
              <Value>{getValidDate(item.date)}</Value>
            </div>
          }
        >
          <Container>
            {item.surgicalHistory.map((history, index) => (
              <BlockLine style={{ margin: 0 }} key={index}>
                <Type>{history.date ? moment(history.date).format("DD.MM.YYYY") : ""}</Type>
                <Value>{history.value}</Value>
              </BlockLine>
            ))}
          </Container>
        </Accordion>
      ))}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
