import { IInstrumentalResearchWithHistory } from "common/interfaces/IInstrumentalResearchWithHistory";
import { BlockLine } from "pages/DiseaseCard/style/BlockLine";
import { BorderGreen } from "pages/DiseaseCard/style/BorderGreen";
import moment from "moment";
import React, { FC } from "react";
import { Type, Value } from "../../../../style/Description";
import { Accordion } from "../../../../../../common/components/Accordion/Accordion";

interface IProps {
  items: IInstrumentalResearchWithHistory[];
}

export const InstrResearchGroup: FC<IProps> = ({ items = [] }) => {
  if (!items || !items.length) return null;
  return (
    <>
      {items.map((item, i) => (
        <Accordion
          disabledClick={!item.instrumentalResearch || !item.instrumentalResearch.length}
          hiddenArrow={!item.instrumentalResearch || !item.instrumentalResearch.length}
          hiddenBorder
          hiddenPadding
          styleTitle={{ fontWeight: 500 }}
          key={i}
          title={item.name}
        >
          {item.instrumentalResearch.map((research, ind) => (
            <BorderGreen key={ind}>
              <BlockLine>
                <Type>Дата</Type>
                <Value>{research.instResearchDate ? moment(research.instResearchDate).format("DD.MM.YYYY") : ""}</Value>
              </BlockLine>
              <BlockLine>
                <Type>Имя</Type>
                <Value>{research.instResearchName}</Value>
              </BlockLine>
              <BlockLine>
                <Type>ЛПУ</Type>
                <Value>{research.instResearchLpu}</Value>
              </BlockLine>
              <BlockLine>
                <Type>Заключение</Type>
                <Value>{research.instResearchConclusion}</Value>
              </BlockLine>
            </BorderGreen>
          ))}
        </Accordion>
      ))}
    </>
  );
};
