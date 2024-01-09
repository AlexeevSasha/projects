import { IMedicalCareCase } from "common/interfaces/medical/IMedicalCareCase";
import moment from "moment";
import React, { FC } from "react";
import { BlockLine } from "../../../style/BlockLine";
import { BorderGreen } from "../../../style/BorderGreen";
import { Type, Value } from "../../../style/Description";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";

interface IProps {
  display: string;
  items: IMedicalCareCase[];
  isPreview?: boolean;
}

export const SectionMedicalCareCase: FC<IProps> = ({ display = "Медицинская помощь", items = [], isPreview }) => {
  if (!items || !items?.length) return null;

  return (
    <Accordion isActive={isPreview} onlyBorderContent title={display}>
      {items?.map((item) => (
        <BorderGreen key={item.caseBizKey}>
          <BlockLine>
            <Type>Дата начала</Type>
            <Value>{moment(item.caseOpenAt).format("DD.MM.YYYY")}</Value>
          </BlockLine>
          <BlockLine>
            <Type>Дата окончания</Type>
            <Value>{moment(item.caseCloseAt).format("DD.MM.YYYY")}</Value>
          </BlockLine>
          <BlockLine>
            <Type>ЛПУ</Type>
            <Value>{item.caseLpu}</Value>
          </BlockLine>
          <BlockLine>
            <Type>Тип случая</Type>
            <Value>{item.caseTypeName}</Value>
          </BlockLine>
        </BorderGreen>
      ))}
    </Accordion>
  );
};
