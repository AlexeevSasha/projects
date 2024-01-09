import { EditOutlined, FontSizeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { MatchingItem } from "common/interfaces/matching";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../assets/theme/theme";

type Props = {
  access: boolean;
};

export const getMatchingColumns = ({ access }: Props): ColumnsType<MatchingItem> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("matching.ownTeam")}</Title>,
      dataIndex: "MatchInfoStat",
      showSorterTooltip: false,
      width: "15%",
      ellipsis: true,
      render: (_, entity) => entity.MatchInfoStat.find((elem) => elem.Team?.Type === "OwnTeam")?.Team?.Name?.[locale],
    },
    {
      title: <Title>{t("matching.oppositeTeam")}</Title>,
      dataIndex: "MatchInfoStat",
      showSorterTooltip: false,
      width: "15%",
      ellipsis: true,
      render: (_, entity) =>
        entity.MatchInfoStat.find((elem) => elem.Team?.Type === "OppositeTeam")?.Team?.Name?.[locale],
    },
    {
      title: <Title>{t("allPages.tournament")}</Title>,
      dataIndex: `Tournament/Name/${locale}`,
      sorter: true,
      width: access ? "15%" : "22%",
      showSorterTooltip: false,
      render: (_, entity) => entity.Tournament?.Name?.[locale],
    },
    {
      title: <Title>{t("allPages.dateTime")}</Title>,
      dataIndex: "MatchStartDateTime",
      sorter: true,
      width: access ? "15%" : "22%",
      showSorterTooltip: false,
      ellipsis: true,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
    {
      title: <Title>{t("matching.MatchType")}</Title>,
      dataIndex: "MatchType",
      width: "6%",
      showSorterTooltip: false,
      render: (text) => text || "-",
    },
    {
      title: <Title>{t("matching.WinlineId")}</Title>,
      dataIndex: "WinlineId",
      width: "10%",
      showSorterTooltip: false,
      render: (text) => text || "-",
    },
    {
      title: <Title>{t("matching.TicketId")}</Title>,
      dataIndex: "EventId",
      width: "10%",
      showSorterTooltip: false,
      render: (text) => text || "-",
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: "14%",
          render: (_, { Id }) => (
            <Actions>
              <Link to={`/matches/${Id}/event`}>
                <FontSizeOutlined style={{ color: theme.colors.red1 }} />
              </Link>
              <Link to={routePaths.form.edit(Id)}>
                <EditOutlined /> {t("allPages.change")}
              </Link>
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
  gap: 8px;
`;
