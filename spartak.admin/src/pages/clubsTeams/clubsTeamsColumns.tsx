import { EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { Team } from "common/interfaces/teams";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "../../ui/Delete";

type Props = {
  onDelete: (Id: Team["Id"]) => void;
  access: boolean;
};

export const getClubsTeamsColumns = ({ onDelete, access }: Props): ColumnsType<Team> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("clubsTeams.teamId")}</Title>,
      dataIndex: "InStatId",
      sorter: true,
      defaultSortOrder: "descend",
      showSorterTooltip: false,
      width: "15%",
      ellipsis: true,
      render: (text) => <RedId>{text}</RedId>,
    },
    {
      title: <Title>{t("clubsTeams.teamName")}</Title>,
      dataIndex: ["FullName", locale],
      sorter: true,
      width: "40%",
      showSorterTooltip: false,
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      width: access ? "15%" : "22%",
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text]}>{t(`allPages.statuses.${text}`)}</Tag>,
    },
    {
      title: <Title>{t("allPages.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      width: access ? "16%" : "23%",
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text),
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          width: "14%",
          dataIndex: "action",
          fixed: "right",
          render: (_, { Id }) => (
            <Actions>
              <Link to={routePaths.form.edit(Id)}>
                <EditOutlined /> {t("allPages.change")}
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
const RedId = styled.div`
  font-weight: 400;
  color: ${theme.colors.red1};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;
