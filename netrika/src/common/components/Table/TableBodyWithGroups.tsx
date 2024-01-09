import React, { FC, memo } from "react";
import { TableGroup } from "./TableGroup";
import { IControlTable, TableBody } from "./TableBody";
import { IThead } from "./TableHead";
import { IRegisterGroupListItem } from "../../interfaces/register/IRegisterGroupListItem";

interface IProps {
  tableHead: IThead[];
  list: IRegisterGroupListItem[];
  checkControl?: (id: number, check: boolean) => void;
  checkList?: number[];
  control?: IControlTable[];
}

export const TableBodyWithGroups: FC<IProps> = memo((props) => {
  return (
    <>
      {props.list.map((registerGroup, index) => (
        <TableGroup key={index} index={index} name={registerGroup.name}>
          <TableBody
            clickRow
            tableHead={props.tableHead}
            tableBody={registerGroup.registers}
            control={props.control}
            checkList={props.checkList}
            checkControl={false}
            disabledApproveDelete
            id={`group_${index}_`}
          />
        </TableGroup>
      ))}
    </>
  );
});
