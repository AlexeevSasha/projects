import { ITreatmentWithHistory } from "common/interfaces/ITreatmentWithHistory";
import moment from "moment";
import React, { FC } from "react";
import { BlockLine } from "../../../style/BlockLine";
import { Type, Value } from "../../../style/Description";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";
import { getSortByDate } from "../../../helpers/getSortByDate";

interface IProps {
  display: string;
  items: ITreatmentWithHistory[];
  isPreview: boolean;
}

export const SectionTreatment: FC<IProps> = ({ display = "История лечения", items = [], isPreview }) => {
  if (!items || !items.length) return null;
  return (
    <Accordion isActive={isPreview} onlyBorderContent title={display}>
      <Container>
        {items?.map((item, i) => (
          <Accordion
            isActive={isPreview && !i}
            onlyBorderContent
            disabledClick={!item?.treatmentHistory || !item?.treatmentHistory.length}
            hiddenArrow={!item?.treatmentHistory || !item?.treatmentHistory.length}
            key={item.name + i}
            styleTitle={{ fontWeight: 500 }}
            title={item.name}
          >
            {item?.treatmentHistory?.length ? (
              <Container>
                {getSortByDate(item.treatmentHistory, "date").map((history, index) => (
                  <BlockLine style={{ margin: 0 }} key={index}>
                    <Type>{history.date ? moment(history.date).format("DD.MM.YYYY") : ""}</Type>
                    <Value>{history.value}</Value>
                  </BlockLine>
                ))}
              </Container>
            ) : null}
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
