/* eslint-disable max-len */
import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { DeleteAction } from "../../ActionsTable";
import { accessNames } from "../../../common/accessControles/accessNames";
import type { IEmployeeRole } from "../../../api/dto/employees/IEmployeeRole";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const generateColumnsEmployeeRoles = (access: boolean, handler: Record<string, Function>): ColumnsType<IEmployeeRole> => {
  const columnActions: ColumnType<IEmployeeRole> = access
    ? {
      title: handler.translation("common.action"),
      key: "operation",
      fixed: "right",
      width: 180,
      render: (entity: IEmployeeRole) => {
        return entity && entity.policies && entity.policies.includes(accessNames.fullAccess) || entity.name === 'Нет прав' ? (
          <></>
        ) : (
          <div>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handler.showFormRole(entity)}
              title={handler.translation("common.buttonsText.edit")}
            />
            <DeleteAction
              type="link"
              title={handler.translation("common.delete")}
              icon={<DeleteOutlined />}
              onClick={() => handler.showModalRemove(entity.id)}
            />
          </div>
        );
      }
    }
    : {};

  const columnDate: ColumnType<IEmployeeRole> = {
    title: handler.translation("common.createdUtc"),
    dataIndex: "createdUtc",
    showSorterTooltip: false,
    sorter: true,
    width: "50%",
    render: (text: string) => getFormatedDate(text)
  };

  const columnName: ColumnType<IEmployeeRole> = {
    title: handler.translation("common.title"),
    dataIndex: "name",
    sorter: true,
    showSorterTooltip: false,
    width: "50%",
    ellipsis: true,
    fixed: "left",
    render: (text: string, entity: IEmployeeRole) => <a onClick={() => handler.showDescriptionRole(entity)}>{text}</a>
  };

  return [columnName, columnDate, columnActions];
};
