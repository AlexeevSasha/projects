import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { EmployeeRoleType } from "common/interfaces/employee";
import { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { theme } from "../../assets/theme/theme";

type Props = {
  onDelete: (id: EmployeeRoleType["Id"]) => void;
  onPreview: (role: EmployeeRoleType) => void;
  access: boolean;
};

export const getEmployeeRoleColumns = ({ onDelete, onPreview, access }: Props): ColumnsType<EmployeeRoleType> => [
  {
    title: <Title>{t("roles.roleName")}</Title>,
    dataIndex: "Name",
    sorter: true,
    width: access ? "43%" : "50%",
    showSorterTooltip: false,
    render: (text, role) => (
      <Link to="" onClick={() => onPreview(role)}>
        {text}
      </Link>
    ),
  },
  {
    title: <Title>{t("allPages.createdUtc")}</Title>,
    dataIndex: "CreatedUtc",
    sorter: true,
    width: access ? "43%" : "50%",
    showSorterTooltip: false,
    render: (text) => <Text>{formatInMoscowDate(text)}</Text>,
  },
  access
    ? {
        title: <Title>{t("allPages.action")}</Title>,
        dataIndex: "action",
        fixed: "right",
        width: "14%",
        render: (_, role) =>
          !role.Policies.includes("fullAccess") ? (
            <Actions>
              <Link to={routePaths.form.edit(role.Id)}>
                <EditOutlined /> {t("allPages.change")}
              </Link>

              <Delete style={{ marginLeft: "8px" }} onClick={() => onDelete(role.Id)} />
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
