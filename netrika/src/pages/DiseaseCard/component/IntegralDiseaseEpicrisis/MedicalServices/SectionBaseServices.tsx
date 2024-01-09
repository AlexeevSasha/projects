import React, { FC } from "react";
import { BorderGreen } from "../../../style/BorderGreen";
import { IMedicalServicesItem } from "../../../../../common/interfaces/medical/IMedicalServicesDiseaseCard";
import { DocumentItem } from "../../TriggerBlock/DocumentItem";
import { BaseItem } from "../../TriggerBlock/BaseItem";
import { Accordion } from "../../../../../common/components/Accordion/Accordion";

interface IProps {
  service: IMedicalServicesItem;
  collapse?: boolean;
  rightCol?: boolean;
}

export const SectionBaseServices: FC<IProps> = ({ service }) => {
  return (
    <BorderGreen>
      <div style={{ marginBottom: "12px" }}>{service.codeName}</div>

      {!!service.documents?.length && (
        <Accordion styleContainer={{ marginBottom: "12px" }} size={"sm"} title={"Документы"}>
          {service.documents.map((item, i) => (
            <DocumentItem key={`${service.codeName}_${item.documentName}_${i}`} document={item} />
          ))}
        </Accordion>
      )}

      {!!service.serviceParams?.length && (
        <Accordion styleContainer={{ marginBottom: "12px" }} size={"sm"} title={"Параметры услуги"}>
          {service.serviceParams?.map((item) => (
            <BaseItem key={`${item.code}`} name={item.code} value={item.value} />
          ))}
        </Accordion>
      )}
    </BorderGreen>
  );
};
