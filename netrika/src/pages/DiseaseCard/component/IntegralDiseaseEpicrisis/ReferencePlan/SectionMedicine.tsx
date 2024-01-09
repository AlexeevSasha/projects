import { IAllMedicineWithHistory } from "common/interfaces/IAllMedicineWithHistory";
import moment from "moment";
import React, { FC } from "react";
import { BlockLine } from "../../../style/BlockLine";
import { Type, Value } from "../../../style/Description";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";
import styled from "styled-components";

interface IProps {
  display: string;
  items: IAllMedicineWithHistory[];
  isPreview?: boolean;
}

export const SectionMedicine: FC<IProps> = ({ display = "Назначенные медикаменты", items = [], isPreview }) => {
  if (!items || !items.length) return null;

  return (
    <Accordion isActive={isPreview} title={display} onlyBorderContent>
      {items?.map((item, i) => (
        <Container key={item.medClassificationName + i}>
          <Accordion
            isActive={isPreview && i === 0}
            disabledClick={!item.medWithHistory || !item.medWithHistory.length}
            hiddenArrow={!item.medWithHistory || !item.medWithHistory.length}
            onlyBorderContent
            title={item.medClassificationName}
            styleTitle={{ fontWeight: 500 }}
          >
            {item?.medWithHistory?.map((attribute) => (
              <Container key={attribute.name}>
                <Accordion
                  disabledClick={!attribute.history || !attribute.history.length}
                  hiddenArrow={!attribute.history || !attribute.history.length}
                  onlyBorderContent
                  title={
                    <BlockLine style={{ margin: 0 }}>
                      <Type>{attribute.name}</Type>
                      <Value>{attribute.atxGroup + " " + attribute.atxGroupCode + " "}</Value>
                    </BlockLine>
                  }
                >
                  {attribute?.history?.map((history, index) => (
                    <BlockLine key={index}>
                      <Type>{moment(history.date).format("DD.MM.YYYY")}</Type>
                      <Value>{history.value}</Value>
                    </BlockLine>
                  ))}
                </Accordion>
              </Container>
            ))}
          </Accordion>
        </Container>
      ))}
    </Accordion>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
