import React from "react";
import { FlexContainer } from "../../../../../../../../common/ui/FlexContainer";
import { BlockTitle, RowTitle, RowValue } from "../../styles";
import { IPatientRoutePoint } from "../../../../../../../../common/interfaces/patient/IPatientRoutePoint";

interface IProps
  extends Pick<
    IPatientRoutePoint,
    | "deviationCount"
    | "crDeviationCount"
    | "pggDeviationCount"
    | "pompDeviationCount"
    | "criticalDeviationCount"
    | "crCriticalDeviationCount"
    | "pggCriticalDeviationCount"
    | "pompCriticalDeviationCount"
  > {}

export const DeviationsInfo: React.FC<IProps> = (props) => {
  return (
    <>
      <BlockTitle>Нарушения</BlockTitle>
      <FlexContainer direction={"row"} justify={"flex-start"}>
        <div>
          <RowTitle>Всего:</RowTitle>
          <RowValue>{props?.deviationCount}</RowValue>
        </div>
        <div>
          <RowTitle>КР:</RowTitle>
          <RowValue>{props?.crDeviationCount}</RowValue>
        </div>
        <div>
          <RowTitle>ПГГ:</RowTitle>
          <RowValue>{props?.pggDeviationCount}</RowValue>
        </div>
        <div>
          <RowTitle>Порядок:</RowTitle>
          <RowValue>{props?.pompDeviationCount}</RowValue>
        </div>
      </FlexContainer>
      <FlexContainer direction={"row"} justify={"flex-start"}>
        <div>
          <RowTitle>Критических всего:</RowTitle>
          <RowValue>{props?.criticalDeviationCount}</RowValue>
        </div>
        <div>
          <RowTitle>Критических по КР:</RowTitle>
          <RowValue>{props?.crCriticalDeviationCount}</RowValue>
        </div>
        <div>
          <RowTitle>Критических по ПГГ:</RowTitle>
          <RowValue>{props?.pggCriticalDeviationCount}</RowValue>
        </div>
        <div>
          <RowTitle>Критических по Порядку:</RowTitle>
          <RowValue>{props?.pompCriticalDeviationCount}</RowValue>
        </div>
      </FlexContainer>
    </>
  );
};
