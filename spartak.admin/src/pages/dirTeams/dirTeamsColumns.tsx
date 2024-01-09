import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { Team } from "common/interfaces/teams";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatInMoscowDate } from "../../common/helpers/getFormatedDate";
import { Delete } from "ui/Delete";

interface IProps {
  access: boolean;
  onDelete: (id: string) => void;
}

export const getDirTeamsColumns = ({ access, onDelete }: IProps): ColumnsType<Team> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("dirTeam.table.columns.name")}</Title>,
      dataIndex: ["FullName", locale],
      sorter: true,
      showSorterTooltip: false,
      width: "70%",
      ellipsis: true,
    },
    {
      title: <Title>{t("dirTeam.table.columns.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      showSorterTooltip: false,
      width: access ? "18%" : "30%",
      render: (text) => formatInMoscowDate(text),
    },
    access
      ? {
          title: <Title>{t("dirTeam.table.columns.action")}</Title>,
          dataIndex: "action",
          width: "12%",
          fixed: "right",
          render: (_, { Id }) => (
            <Actions>
              <Link to={routePaths.form.edit(Id)}>
                <EditOutlined /> {t("dirTeam.table.change")}
              </Link>

              <Delete style={{ marginLeft: "8px" }} onClick={() => onDelete(Id)} />
            </Actions>
          ),
        }
      : {},
  ];
};

const Title = styled.div`
  font-weight: 600;
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
`;
