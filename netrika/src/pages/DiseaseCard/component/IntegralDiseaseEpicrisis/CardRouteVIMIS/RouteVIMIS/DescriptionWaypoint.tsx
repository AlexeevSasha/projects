import React from "react";
import { BorderGreen } from "../../../../style/BorderGreen";
import { TableHead } from "../../../../../../common/components/Table/TableHead";
import { TableBody } from "../../../../../../common/components/Table/TableBody";
import { BlockTitle } from "./styles";
import { IPatientRoutePoint } from "../../../../../../common/interfaces/patient/IPatientRoutePoint";

interface IProps extends Pick<IPatientRoutePoint, "pointName" | "beginOn" | "moName"> {
  stageName?: string;
  isCurrentPoint?: string;
  isDead?: string;
}

const tableHead = [
  { name: "Текущая точка", value: "isCurrentPoint" },
  { name: "Наименование этапа", value: "stageName" },
  { name: "Наименование подэтапа", value: "pointName" },
  { name: "Дата начала точки маршрута", value: "beginOn", type: "date" },
  { name: "Организация", value: "moName" },
  { name: "Привязка смерти пациента", value: "isDead" },
];

export const DescriptionWaypoint: React.FC<IProps> = (props) => {
  return (
    <>
      <BlockTitle>Описание Выбранной точки маршрута</BlockTitle>
      <BorderGreen hidePadding>
        <TableHead tableHead={tableHead}>
          <TableBody tableHead={tableHead} tableBody={[props]} />
        </TableHead>
      </BorderGreen>
    </>
  );
};
