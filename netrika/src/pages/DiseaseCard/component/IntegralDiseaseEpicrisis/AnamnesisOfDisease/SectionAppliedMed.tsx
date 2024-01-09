import { IAllMedicineWithHistory } from "common/interfaces/IAllMedicineWithHistory";
import moment from "moment";
import React, { FC } from "react";
import { BlockLine } from "../../../style/BlockLine";
import { Type, Value } from "../../../style/Description";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";
import { getSortByDate } from "../../../helpers/getSortByDate";

interface IProps {
  display: string;
  items: IAllMedicineWithHistory[];
  isPreview?: boolean;
}

export const SectionAppliedMed: FC<IProps> = ({ display = "Примененные медикаменты", items = [], isPreview }) => {
  if (!items || !items.length) return null;

  return (
    <Accordion isActive={isPreview} onlyBorderContent title={display}>
      <Container>
        {items.map((item, i) => (
          <Accordion
            isActive={isPreview && !i}
            onlyBorderContent
            key={item.medClassificationName + i}
            disabledClick={!item.medWithHistory || !item.medWithHistory?.length}
            hiddenArrow={!item.medWithHistory || !item.medWithHistory?.length}
            styleTitle={{ fontWeight: 500 }}
            title={item.medClassificationName}
          >
            {item.medWithHistory?.length ? (
              <Container>
                {item.medWithHistory.map((attribute, i) => (
                  <Accordion
                    onlyBorderContent
                    key={attribute.name + i}
                    disabledClick={!attribute.history?.length}
                    hiddenArrow={!attribute.history?.length}
                    title={
                      <Type>
                        {attribute.name} {attribute.atxGroup} {attribute.atxGroupCode}
                      </Type>
                    }
                  >
                    {attribute?.history ? (
                      <Container>
                        {getSortByDate(attribute?.history, "date").map((history, index) => (
                          <BlockLine style={{ margin: 0 }} key={index}>
                            <Type>{moment(history.date).format("DD.MM.YYYY")}</Type>
                            <Value>{history.value}</Value>
                          </BlockLine>
                        ))}
                      </Container>
                    ) : null}
                  </Accordion>
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
