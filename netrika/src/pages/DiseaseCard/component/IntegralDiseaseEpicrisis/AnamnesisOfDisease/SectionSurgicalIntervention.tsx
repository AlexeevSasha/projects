import { IServiceInterventionWithHistory } from "common/interfaces/IServiceInterventionWithHistory";
import React, { FC, useMemo } from "react";
import { BlockLine } from "../../../style/BlockLine";
import { Type, Value } from "../../../style/Description";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import { getValidDate } from "../../../helpers/getValidDate";
import { getSortByDate } from "../../../helpers/getSortByDate";
import styled from "styled-components";

interface IProps {
  display: string;
  items: IServiceInterventionWithHistory[];
  isPreview?: boolean;
}

export const SectionSurgicalIntervention: FC<IProps> = ({
  display = "Примененные хирургические вмешательства",
  items = [],
  isPreview,
}) => {
  const indexItemsWithSurgicalHistory = useMemo(
    () => getSortByDate(items, "date")?.findIndex((el) => el?.surgicalHistory?.length),
    [items]
  );

  if (!items || !items.length) return null;
  return (
    <Accordion isActive={isPreview} onlyBorderContent title={display}>
      <Container>
        {getSortByDate(items, "date").map((item, i) => (
          <Accordion
            isActive={isPreview && indexItemsWithSurgicalHistory === i}
            key={i}
            disabledClick={!item.surgicalHistory || !item.surgicalHistory.length}
            hiddenArrow={!item.surgicalHistory || !item.surgicalHistory.length}
            onlyBorderContent
            title={
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Type>{item.name}</Type>
                <Value> {getValidDate(item.date)} </Value>
              </div>
            }
          >
            <Container>
              {getSortByDate(item?.surgicalHistory, "date")?.map((history, index) => (
                <BlockLine style={{ margin: 0 }} key={index}>
                  <Type>{getValidDate(history.date)}</Type>
                  <Value>{history.value}</Value>
                </BlockLine>
              ))}
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
  gap: 10px;
`;
