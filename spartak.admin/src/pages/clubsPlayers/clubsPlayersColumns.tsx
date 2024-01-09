import { EditOutlined } from "@ant-design/icons";
import { Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { noImage } from "common/constants/noImage";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { Player } from "common/interfaces/players";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const getClubsPlayersColumns = ({ access }: { access: boolean }): ColumnsType<Player> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("allPages.fio")}</Title>,
      dataIndex: ["FullName", locale],
      width: "26%",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => <Link to="">{text}</Link>,
    },
    {
      title: <Title>{t("allPages.photo")}</Title>,
      dataIndex: "ImageUrl",
      sorter: false,
      showSorterTooltip: false,
      ellipsis: true,
      width: "12%",
      render: (text) => <Image src={text} fallback={noImage} width={24} style={{ borderRadius: "50%" }} />,
    },

    {
      title: <Title>{t("allPages.role")}</Title>,
      dataIndex: ["Amplua", "Name", locale],
      sorter: true,
      width: "12%",
      showSorterTooltip: false,
      ellipsis: true,
    },
    {
      title: <Title>{t("clubsPlayers.club")}</Title>,
      width: "12%",
      dataIndex: ["Teams", 0, "Name", locale],
      showSorterTooltip: false,
      ellipsis: true,
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      width: access ? "12%" : "18%",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text]}>{t(`allPages.statuses.${text}`)}</Tag>,
    },
    {
      title: <Title>{t("allPages.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      width: access ? "12%" : "18%",
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text),
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: "12%",
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
