import { EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { MatchListItem } from "common/interfaces/matches";
import { Staff } from "common/interfaces/staff";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";

type Props = {
  onDelete: (id: Staff["Id"]) => void;
  access: boolean;
};

export const getMatchesColumns = ({ onDelete, access }: Props): ColumnsType<MatchListItem> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("allPages.tournament")}</Title>,
      dataIndex: `TournamentName/${locale}`,
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      width: access ? "17%" : "32%",
      render: (_, entity) => entity.TournamentName?.[locale],
    },
    {
      title: <Title>{t("allPages.season")}</Title>,
      dataIndex: `SeasonName/${locale}`,
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      width: "13%",
      render: (_, entity) => entity.SeasonName?.[locale],
    },
    {
      title: <Title>{t("matches.TeamOne")}</Title>,
      dataIndex: `TeamHome${locale}Name`,
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      width: "13%",
    },
    {
      title: <Title>{t("matches.TeamTwo")}</Title>,
      dataIndex: `TeamVisitor${locale}Name`,
      sorter: true,
      showSorterTooltip: false,
      width: "13%",
    },
    {
      title: <Title>{t("allPages.dateTime")}</Title>,
      dataIndex: "MatchStartDateTime",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
      width: "13%",
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "IsDraft",
      sorter: true,
      showSorterTooltip: false,
      width: "17%",
      render: (text) => (
        <Tag color={statusColors[text === true ? "Draft" : "Published"]}>
          {t(`allPages.statuses.${text === true ? "Draft" : "Published"}`)}
        </Tag>
      ),
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: "15%",
          render: (_, { Id }) => (
            <Actions>
              <Link to={routePaths.form.edit(Id) + "/match"}>
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

const Actions = styled.div`
  display: flex;
  align-items: center;
`;
