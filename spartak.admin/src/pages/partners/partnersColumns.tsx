import { EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { Partner } from "common/interfaces/partners";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { theme } from "../../assets/theme/theme";

type Props = {
  onDelete: (id: Partner["Id"]) => void;
  access: boolean;
};

export const getPartnersColumns = ({ onDelete, access }: Props): ColumnsType<Partner> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("partners.table.columns.partner")}</Title>,
      dataIndex: ["FullName", locale],
      sorter: true,
      showSorterTooltip: false,
      width: access ? "21,5%" : "25%",
      ellipsis: true,
      render: (text) => <RedText>{text}</RedText>,
    },
    {
      title: <Title>{t("allPages.location")}</Title>,
      dataIndex: "Layout",
      sorter: true,
      width: access ? "21,5%" : "25%",
      showSorterTooltip: false,
      render: (text) => text && t(`allPages.layouts.${text}`),
    },
    {
      title: <Title>{t("pagesSections.entity")}</Title>,
      dataIndex: "Section",
      sorter: true,
      width: access ? "21,5%" : "25%",
      showSorterTooltip: false,
      render: (text) => text && t(`allPages.sections.${text}`),
    },
    {
      title: <Title>{t("partners.table.columns.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      width: access ? "21,5%" : "25%",
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text || "None"]}>{t(`allPages.statuses.${text || "None"}`)}</Tag>,
    },
    {
      title: <Title>{t("partners.table.columns.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      width: access ? "21,5%" : "25%",
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
    access
      ? {
          title: <Title>{t("partners.table.columns.action")}</Title>,
          dataIndex: "action",
          width: "14%",
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

const Actions = styled.div`
  display: flex;
  align-items: center;
`;
const RedText = styled.div`
  font-weight: 400;
  color: ${theme.colors.red1};
`;
