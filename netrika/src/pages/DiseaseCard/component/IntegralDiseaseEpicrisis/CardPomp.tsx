import React from "react";
import { IconLoading } from "../../../../common/components/Icon/IconLoading";
import { Card } from "../../../../common/components/Card/Card";
import { IPompResponse } from "../../../../common/interfaces/IPompResponse";
import { usePompConstructor } from "./Pomp/hooks/usePompConstructor";
import { useDiseaseCardPompCardConstructor } from "./PompWithDiagram/hooks/useDiseaseCardPompCardConstructor";

interface IProps {
  pomps: IPompResponse[];
  loading: boolean;
  isCard?: boolean;
}
export const CardPomp: React.FC<IProps> = (props: IProps) => {
  const pomps = usePompConstructor(props.pomps);
  const pompsCard = useDiseaseCardPompCardConstructor(props.pomps);

  return props.isCard && !!props.pomps.length ? (
    <Card
      id={"pomps"}
      title={"Соблюдение порядков организации медицинской помощи"}
      max_height={600}
      isEmpty={false}
      overflowY={"scroll"}
    >
      {props.loading ? <IconLoading /> : pompsCard}
    </Card>
  ) : (
    <div id={"pomps"}>{pomps}</div>
  );
};
