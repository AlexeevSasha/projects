import { CarryOutOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { BestPlayerEntity } from "common/interfaces/bestPlayer";
import i18n, { t } from "i18next";
import moment from "moment";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { theme } from "../../assets/theme/theme";

type Props = {
  onDelete: (id: BestPlayerEntity["Id"]) => void;
  onDownload: (id: BestPlayerEntity["Id"]) => void;
  access: boolean;
};

export const getBestPlayerColumns = ({ onDelete, onDownload, access }: Props): ColumnsType<BestPlayerEntity> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  const columns: ColumnsType<BestPlayerEntity> = [
    {
      title: <Title>{t("bestPlayer.name")}</Title>,
      sorter: false,
      showSorterTooltip: false,
      ellipsis: true,
      render: (_, { Id, Month, EndVoting, Match }) => {
        const dateNow = Date.now();
        const endDate = +new Date(EndVoting.split("Z")[0]);

        return dateNow > endDate ? (
          <Link to={`result/${routePaths.form.edit(Id)}`}>
            {t(`bestPlayer.${Month ? "monthPlayer" : Match ? "matchPlayer" : "seasonPlayer"}`)}
          </Link>
        ) : (
          <RedText>{t(`bestPlayer.${Month ? "monthPlayer" : Match ? "matchPlayer" : "seasonPlayer"}`)}</RedText>
        );
      },
    },
    {
      title: <Title>{t("bestPlayer.participants")}</Title>,
      dataIndex: "Count",
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      render: (text) => text,
    },
    {
      title: <Title>{t("bestPlayer.Match/month")}</Title>,
      sorter: false,
      showSorterTooltip: false,
      render: (_, { Month, Match }) => (Month ? moment(Month).format("MMMM") : Match?.Name[locale] || ""),
    },
    {
      title: <Title>{t("allPages.startDate")}</Title>,
      dataIndex: "StartVoting",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
    {
      title: <Title>{t("allPages.endDate")}</Title>,
      dataIndex: "EndVoting",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text]}>{t(`allPages.statuses.${text}`)}</Tag>,
    },
  ];

  access &&
    columns.push({
      title: <Title>{t("allPages.action")}</Title>,
      dataIndex: "action",
      width: 170,
      fixed: "right",
      render: (_, { Id, EndVoting }) => {
        const dateNow = Date.now();
        const endDate = +new Date(EndVoting);

        return (
          <Actions>
            {dateNow - endDate > 0 ? (
              <>
                <a onClick={() => onDownload(Id)}>
                  <DownloadOutlined /> {t("allPages.download")}
                </a>

                <Link to={`result/${routePaths.form.edit(Id)}`} style={{ marginLeft: "5px" }}>
                  <CarryOutOutlined />
                </Link>
              </>
            ) : (
              <Link to={`edit/${routePaths.form.edit(Id)}`}>
                <EditOutlined /> {t("allPages.change")}
              </Link>
            )}

            <Delete style={{ marginLeft: "8px" }} onClick={() => onDelete(Id)} />
          </Actions>
        );
      },
    });

  return columns;
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
