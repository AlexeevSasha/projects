import React, { FC } from "react";
import { styled } from "../../../../../../common/styles/styled";
import { theme } from "../../../../../../common/styles/theme";
import { FlexContainer } from "../../../../../../common/ui/FlexContainer";
import { IPatientRoute } from "../../../../../../common/interfaces/patient/IPatientRoute";
import moment from "moment";

type IProps = Pick<
  IPatientRoute,
  "nosologyCode" | "graphName" | "nosologyName" | "docNumber" | "occasionBeginOn" | "occasionEndOn"
>;

export const RouteInfo: FC<IProps> = (props) => {
  return (
    <>
      <FlexContainer direction={"row"} justify={"space-between"}>
        <div>
          <RowTitle>Код заболевания</RowTitle>
          <RowValue>{props?.nosologyCode}</RowValue>
        </div>

        <div>
          <RowTitle>Наименование заболевания</RowTitle>
          <RowValue>{props?.nosologyName}</RowValue>
        </div>
        <div>
          <RowTitle>Документ</RowTitle>
          <RowValue>{props?.docNumber}</RowValue>
        </div>
        <div>
          <RowTitle>Дата начала случая</RowTitle>
          <RowValue>{props?.occasionBeginOn && moment(props.occasionBeginOn).format("DD MMMM YYYY")}</RowValue>
        </div>
      </FlexContainer>
      <FlexContainer direction={"row"} justify={"space-between"}>
        <div>
          <RowTitle>код заболевания</RowTitle>
          <RowValue>{props?.graphName}</RowValue>
        </div>
        <div>
          <RowTitle>Дата окончания случая</RowTitle>
          <RowValue>{props?.occasionEndOn && moment(props?.occasionEndOn).format("DD MMMM YYYY")}</RowValue>
        </div>
      </FlexContainer>
    </>
  );
};
const RowTitle = styled.span`
  margin-right: 5px;
  color: ${theme.colors.hightBlue};
`;
const RowValue = styled.span`
  margin-right: 10px;
`;
