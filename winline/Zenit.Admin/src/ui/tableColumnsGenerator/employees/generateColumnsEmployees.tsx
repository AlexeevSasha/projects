import { getFormatedDate } from "../../../common/helpers/getFormatedDate";
import { DeleteAction } from "../../ActionsTable";
import { checkFullAccessPolice } from "../../../common/helpers/employees/checkFullAccessPolice";
import { Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
import type { IEmployeeRole } from "../../../api/dto/employees/IEmployeeRole";
import type { IEmployee } from "../../../api/dto/employees/IEmployee";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { TFunction } from "react-i18next";
import styled from "styled-components";

interface IHandler {
  showFormEmployee: Function;
  updateInvitation: Function;
  showErrorModal: Function;
  employeeRoles: IEmployeeRole[];
  disabledButtonsInvitation: Record<string, boolean>;
  translation: TFunction<"translation">;
  isLoading: boolean;
}

export const generateColumnsEmployees = (access: boolean, handlers: IHandler): ColumnsType<IEmployee> => {
  const columnName: ColumnType<IEmployee> = {
    title: handlers.translation("employees.name"),
    dataIndex: "name",
    width: "22%",
    ellipsis: true,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left"
  };
  const columnEmail: ColumnType<IEmployee> = {
    title: handlers.translation("common.email"),
    dataIndex: "email",
    sorter: true,
    width: "22%",
    ellipsis: true,
    showSorterTooltip: false
  };
  const columnRole: ColumnType<IEmployee> = {
    title: handlers.translation("common.role"),
    dataIndex: "role",
    sorter: true,
    width: "22%",
    ellipsis: true,
    showSorterTooltip: false
  };
  const columnDateActivated: ColumnType<IEmployee> = {
    title: handlers.translation("employees.table.columns.activationDate.title"),
    dataIndex: "activationDate",
    showSorterTooltip: false,
    sorter: true,
    width: "14%",
    render: (text, { id }) => {
      if (!text) {
        return (
          <ColumnActivated>
            <span>{handlers.translation("employees.table.columns.activationDate.notActive")}</span>
            <Tooltip placement="top" title={handlers.translation("employees.table.columns.activationDate.tooltip")}>
              {access && (
                <Button
                  onClick={() => handlers.updateInvitation(id)}
                  style={{ marginLeft: "10px" }}
                  icon={<MailOutlined />}
                  type={"primary"}
                  disabled={handlers.isLoading || handlers.disabledButtonsInvitation[id]}
                />
              )}
            </Tooltip>
          </ColumnActivated>
        );
      }

      return <ColumnActivated>{handlers.translation("employees.table.columns.activationDate.active")}</ColumnActivated>;
    }
  };
  const columnDate: ColumnType<IEmployee> = {
    title: handlers.translation("common.createdUtc"),
    dataIndex: "createdUtc",
    showSorterTooltip: false,
    sorter: true,
    width: "10%",
    render: (text: string) => getFormatedDate(text)
  };

  const columnActions: ColumnType<IEmployee> = {
    title: handlers.translation("common.action"),
    key: "operation",
    fixed: "right",
    width: "10%",
    render: (entity) => {
      const entityRole = handlers.employeeRoles?.find((role) => role.id === entity.roleId);

      return (
        !checkFullAccessPolice(entityRole) && (
          <div>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handlers.showFormEmployee(entity.id)}
              title={handlers.translation("common.buttonsText.edit")}
            />
            <DeleteAction
              type="link"
              title={handlers.translation("common.delete")}
              icon={<DeleteOutlined />}
              onClick={() => handlers.showErrorModal(entity.id)}
            />
          </div>
        )
      );
    }
  };

  const colums = [columnName, columnEmail, columnRole, columnDateActivated, columnDate];
  if (access) {
    colums.push(columnActions);
  }

  return colums;
};

const ColumnActivated = styled.span`
  line-height: 33px;
`;
