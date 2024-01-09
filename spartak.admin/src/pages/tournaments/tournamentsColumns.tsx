import { EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { Tournament } from "common/interfaces/tournaments";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IProps {
  access: boolean;
}

export const getTournamentsColumns = ({ access }: IProps): ColumnsType<Tournament> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("allPages.title")}</Title>,
      dataIndex: ["ShortName", locale],
      sorter: true,
      showSorterTooltip: false,
      render: (text) => <TextStyles>{text}</TextStyles>,
      width: access ? "25%" : "35%",
    },
    {
      title: <Title>{t("allPages.startDate")}</Title>,
      dataIndex: "StartDate",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => <TextStyles>{formatInMoscowDate(text, { withTime: true })}</TextStyles>,
      width: "25%",
    },
    {
      title: <Title>{t("allPages.endDate")}</Title>,
      dataIndex: "EndDate",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => <TextStyles>{formatInMoscowDate(text, { withTime: true })}</TextStyles>,
      width: "20%",
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text || "None"]}>{t(`allPages.statuses.${text || "None"}`)}</Tag>,
      width: "20%",
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: 150,
          render: (_, { Id }) => (
            <Link to={`/${routePaths.tournaments(Id, "info")}`}>
              <EditOutlined /> {t("allPages.change")}
            </Link>
          ),
        }
      : {},
  ];
};

const Title = styled.div`
  font-weight: 600;
`;

const TextStyles = styled.div<{ color?: string; textAlign?: string }>`
  text-align: ${({ textAlign }) => textAlign || "left"};
  color: ${theme.colors.gray};
`;
