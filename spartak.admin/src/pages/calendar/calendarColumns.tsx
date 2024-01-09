import { EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { CalendarEntity } from "common/interfaces/calendar";
import { Staff } from "common/interfaces/staff";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";

type Props = {
  onDelete: (id: Staff["Id"]) => void;
  access: boolean;
};

export const getCalendarColumns = ({ onDelete, access }: Props): ColumnsType<CalendarEntity> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("calendar.eventDate")}</Title>,
      dataIndex: "EventDate",
      sorter: true,
      showSorterTooltip: false,
      width: access ? "29%" : "36%",
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
    {
      title: <Title>{t("calendar.eventName")}</Title>,
      dataIndex: ["FullName", locale],
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      width: access ? "29%" : "35%",
      render: (text) => <Link to="">{text}</Link>,
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      showSorterTooltip: false,
      width: "29%",
      render: (text) => <Tag color={statusColors[text]}>{t(`allPages.statuses.${text}`)}</Tag>,
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: "13%",
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
