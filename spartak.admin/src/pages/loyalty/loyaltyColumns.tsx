import { DeleteOutlined, DownloadOutlined, EditOutlined, FlagOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { LoyaltyEntity } from "common/interfaces/loyalty";
import { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  access: boolean;
  openPreview: (value: LoyaltyEntity) => void;
  handleDelete: (id: LoyaltyEntity["Id"]) => void;
  download: (item: LoyaltyEntity) => void;
  setOutOfStock: (id: LoyaltyEntity["Id"]) => void;
};

export const getLoyaltyColumns = ({
  access,
  openPreview,
  handleDelete,
  download,
  setOutOfStock,
}: Props): ColumnsType<LoyaltyEntity> => {
  return [
    {
      title: <Title>{t("loyalty.shareName")}</Title>,
      dataIndex: "Name",
      sorter: true,
      showSorterTooltip: false,
      width: 174,
      ellipsis: true,
      render: (text, item) => (
        <Link to="" onClick={() => openPreview(item)}>
          {text}
        </Link>
      ),
    },
    {
      title: <Title>{t("loyalty.awardTypeTitle")}</Title>,
      dataIndex: ["Condition", "Award", "Type"],
      showSorterTooltip: false,
      sorter: true,
      render: (text) => t(`loyalty.awardType.${text}`),
    },
    {
      title: <Title>{t("loyalty.participantsNum")}</Title>,
      dataIndex: ["AcceptUser", "Total"],
      showSorterTooltip: false,
      sorter: true,
      render: (text, item) => (item.Condition.Award.Type === "ExternalReference" ? "-" : text),
    },
    {
      title: <Title>{t("loyalty.startDate")}</Title>,
      dataIndex: "StartDate",
      showSorterTooltip: false,
      sorter: true,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
    {
      title: <Title>{t("loyalty.endDate")}</Title>,
      dataIndex: "EndDate",
      showSorterTooltip: false,
      sorter: true,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      width: 154,
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text || "None"]}>{t(`allPages.statuses.${text || "None"}`)}</Tag>,
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          fixed: "right",
          width: 126,
          render: (_, item) => (
            <Actions>
              <Link
                to={item.Status === "published" || item.Status === "scheduled" ? routePaths.form.edit(item.Id) : ""}
              >
                <IconWrapper isActive={item.Status === "published" || item.Status === "scheduled"}>
                  <EditOutlined />
                </IconWrapper>
              </Link>

              <IconWrapper
                isActive={item.Status === "scheduled" || item.Status === "published"}
                onClick={() => {
                  (item.Status === "scheduled" || item.Status === "published") && setOutOfStock(item.Id);
                }}
              >
                <FlagOutlined />
              </IconWrapper>

              <IconWrapper
                isActive={item.Status === "completed" || item.Status === "outofstock"}
                onClick={() => {
                  (item.Status === "completed" || item.Status === "outofstock") && download(item);
                }}
              >
                <DownloadOutlined />
              </IconWrapper>

              <Delete onClick={() => handleDelete(item.Id)} />
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
  justify-content: space-between;
`;

const Delete = styled(DeleteOutlined)`
  color: ${theme.colors.red};
`;

const IconWrapper = styled.div<{ isActive?: boolean }>`
  color: ${({ isActive }) => theme.colors[isActive ? "red" : "black"]};
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
`;
