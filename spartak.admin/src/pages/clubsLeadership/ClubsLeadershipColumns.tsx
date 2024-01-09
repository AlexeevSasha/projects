import { EditOutlined } from "@ant-design/icons";
import { Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { noImage } from "common/constants/noImage";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { ILeadership } from "../../common/interfaces/ILeadership";

type Props = {
  onDelete: (id: ILeadership["Id"]) => void;
  access: boolean;
};

export const getClubsLeadershipColumns = ({ onDelete, access }: Props): ColumnsType<ILeadership> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("allPages.form.order")}</Title>,
      dataIndex: "SortOrder",
      sorter: true,
      showSorterTooltip: false,
      width: "6%",
      ellipsis: true,
    },
    {
      title: <Title>{t("allPages.photo")}</Title>,
      dataIndex: "ImageUrl",
      sorter: false,
      width: "4%",
      showSorterTooltip: false,
      ellipsis: true,
      render: (text) => <Image src={text} fallback={noImage} width={24} style={{ borderRadius: "50%" }} />,
    },
    {
      title: <Title>{t("allPages.fio")}</Title>,
      dataIndex: ["FullName", locale],
      sorter: true,
      width: "15%",
      showSorterTooltip: false,
      render: (text) => <Link to="">{text}</Link>,
    },
    {
      title: <Title>{t("allPages.position")}</Title>,
      dataIndex: ["Position", locale],
      sorter: true,
      showSorterTooltip: false,
      width: "12%",
      ellipsis: true,
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      width: access ? "8%" : "12%",
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text]}>{t(`allPages.statuses.${text}`)}</Tag>,
    },
    {
      title: <Title>{t("allPages.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      width: access ? "8%" : "12%",
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text),
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: "8%",
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
