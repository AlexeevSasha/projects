import React, { PropsWithChildren } from "react";
import { BorderGreen } from "../../../../style/BorderGreen";
import { TableHead } from "../../../../../../common/components/Table/TableHead";
import { TableBody } from "../../../../../../common/components/Table/TableBody";
import { BlockTitle } from "./styles";
import { IPatientRouteRecommendationQuestion } from "../../../../../../common/interfaces/patient/IPatientRouteRecommendationQuestion";
import { DrawerContainer } from "../../../../../../common/components/Popup/components/DrawerContainer";

const tableHead = [
  { name: "Вопрос анкеты", value: "questionText" },
  { name: "Ответ Анкеты", value: "answer" },
];

type IProps = PropsWithChildren<{
  questions?: IPatientRouteRecommendationQuestion[];
}>;

export const TableQuestions: React.FC<IProps> = (props) => {
  return (
    <DrawerContainer width={40} unitOfMeasureWidth={"vw"}>
      <div style={{ width: "100%" }}>
        <BlockTitle style={{ textAlign: "center" }}>Анкета пациентов</BlockTitle>
        <BorderGreen hidePadding>
          <TableHead tableHead={tableHead}>
            <TableBody tableHead={tableHead} tableBody={props?.questions || []} />
          </TableHead>
        </BorderGreen>
      </div>
    </DrawerContainer>
  );
};
