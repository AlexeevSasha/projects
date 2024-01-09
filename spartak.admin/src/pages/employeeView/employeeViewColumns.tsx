import { EditOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { Employee, EmployeeRoleType } from "common/interfaces/employee";
import { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { theme } from "../../assets/theme/theme";

type Props = {
  onDelete: (id: Employee["Id"]) => void;
  updateInvitation: Function;
  disableInvite: Record<string, boolean>;
  access: boolean;
  roles?: EmployeeRoleType[];
};

export const getEmployeeViewColumns = ({
  onDelete,
  updateInvitation,
  disableInvite,
  access,
  roles,
}: Props): ColumnsType<Employee> => [
  {
    title: <Title>{t("employee.name")}</Title>,
    dataIndex: "Name",
    sorter: true,
    showSorterTooltip: false,
    ellipsis: true,
    width: "20%",
    render: (text) => <Text>{text}</Text>,
  },
  {
    title: <Title>{t("employee.mail")}</Title>,
    dataIndex: "Email",
    sorter: true,
    width: "16.5%",
    showSorterTooltip: false,
    ellipsis: true,
    render: (text) => <Text>{text}</Text>,
  },
  {
    title: <Title>{t("employee.role")}</Title>,
    dataIndex: "Role",
    sorter: true,
    width: access ? "16.5%" : "23.5%",
    showSorterTooltip: false,
    ellipsis: true,
    render: (text) => <Text>{text}</Text>,
  },
  {
    title: <Title>{t("employee.status")}</Title>,
    dataIndex: "ActivationDate",
    sorter: true,
    showSorterTooltip: false,
    ellipsis: true,
    width: access ? "16.5%" : "23.5%",
    render: (text, { Id }) =>
      formatInMoscowDate(text) === "" ? (
        <span>
          <Text>не активен</Text>
          <Tooltip placement="top" title={"Повторно выслать приглашение"}>
            <Button
              onClick={() => updateInvitation(Id)}
              style={{ marginLeft: "10px" }}
              icon={<MailOutlined />}
              type={"primary"}
              disabled={disableInvite[Id]}
            />
          </Tooltip>
        </span>
      ) : (
        <Text>активен</Text>
      ),
  },
  {
    title: <Title>{t("allPages.createdUtc")}</Title>,
    dataIndex: "CreatedUtc",
    sorter: true,
    showSorterTooltip: false,
    width: "16.5%",
    render: (text) => <Text>{formatInMoscowDate(text)}</Text>,
  },
  access
    ? {
        title: <Title>{t("allPages.action")}</Title>,
        dataIndex: "action",
        fixed: "right",
        width: "14%",
        render: (_, employee) =>
          roles?.find((elem) => elem.Id === employee.RoleId) ? (
            <Actions>
              <Link to={routePaths.form.edit(employee.Id)}>
                <EditOutlined /> {t("allPages.change")}
              </Link>

              <Delete style={{ marginLeft: "8px" }} onClick={() => onDelete(employee.Id)} />
            </Actions>
          ) : null,
      }
    : {},
];

const Title = styled.div`
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  color: ${theme.colors.gray};
`;
