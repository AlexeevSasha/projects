import { EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { GraduateSection } from "common/interfaces/graduateSections";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  access: boolean;
};

export const getGraduateSectionsColumns = ({ access }: Props): ColumnsType<GraduateSection> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("allPages.form.order")}</Title>,
      dataIndex: "SortOrder",
      sorter: true,
      showSorterTooltip: false,
      width: "10%",
      ellipsis: true,
    },
    {
      title: <Title>{t("graduateSections.sectionName")}</Title>,
      dataIndex: ["FullName", locale],
      sorter: true,
      width: "25%",
      showSorterTooltip: false,
      render: (text) => <Link to="">{text}</Link>,
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      width: access ? "12%" : "19%",
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text]}>{t(`allPages.statuses.${text}`)}</Tag>,
    },
    {
      title: <Title>{t("allPages.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      width: access ? "12%" : "19%",
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text),
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: "14%",
          render: (_, { Id }) => (
            <Link to={routePaths.form.edit(Id)}>
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

const Actions = styled.div`
  display: flex;
  align-items: center;
`;
