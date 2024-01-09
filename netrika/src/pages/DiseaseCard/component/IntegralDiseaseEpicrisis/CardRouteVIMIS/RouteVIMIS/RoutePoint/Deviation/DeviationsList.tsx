import React from "react";
import { BorderGreen } from "../../../../../../style/BorderGreen";
import { TableHead } from "../../../../../../../../common/components/Table/TableHead";
import { TableBody } from "../../../../../../../../common/components/Table/TableBody";
import { IPatientRouteDeviation } from "../../../../../../../../common/interfaces/patient/IPatientRouteDeviation";

type Deviation = IPatientRouteDeviation & { stageName?: string; pointName?: string };

interface IProps {
  deviations: Deviation[];
}

const tableHead = [
  { name: "Наименование этапа", value: "stageName" },
  { name: "Наименование подтапа", value: "pointName" },
  { name: "Дата отключения", value: "completedOn", type: "date" },
  { name: "Вид/источник отклонения", value: "deviationKind" },
  { name: "Уровень отклонения", value: "deviationLevel" },
  { name: "Описание отклонения", value: "warningMessage" },
];

export const DeviationsList: React.FC<IProps> = (props) => {
  return (
    <>
      <BorderGreen hidePadding>
        <TableHead tableHead={tableHead}>
          <TableBody tableHead={tableHead} tableBody={props.deviations} />
        </TableHead>
      </BorderGreen>
    </>
  );
};
