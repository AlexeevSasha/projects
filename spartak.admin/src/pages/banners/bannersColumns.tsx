import { EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { BannerEntity } from "common/interfaces/banners";
import { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { IconEye } from "ui/IconEye";

type Props = {
  onDelete: (id: BannerEntity["Id"]) => void;
  access?: boolean;
  onView: (Id: BannerEntity["Id"], IsHidden: BannerEntity["IsHidden"]) => void;
};

export const getBannersColumns = ({ onDelete, access, onView }: Props): ColumnsType<BannerEntity> => {
  const columns: ColumnsType<BannerEntity> = [
    {
      title: <Title>{t("allPages.title")}</Title>,
      dataIndex: "Name",
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      width: 400,
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text || "None"]}>{t(`allPages.statuses.${text || "None"}`)}</Tag>,
    },
    {
      title: <Title>{t("adv.place")}</Title>,
      dataIndex: "LocationName",
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
    },
    {
      title: <Title>{t("adv.startDate")}</Title>,
      dataIndex: "StartPublish",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text),
    },
    {
      title: <Title>{t("adv.endDate")}</Title>,
      dataIndex: "EndPublish",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text),
    },
  ];

  access &&
    columns.push({
      title: <Title>{t("allPages.action")}</Title>,
      dataIndex: "action",
      width: 110,
      fixed: "right",
      render: (_, { Id, IsHidden, EndPublish }) => (
        <Actions>
          {/* {new Date(EndPublish) < new Date() ? null : ( */}
          <IconEye onClick={() => onView(Id, !IsHidden)} value={IsHidden} />
          {/* )} */}
          <Link to={routePaths.form.edit(Id)}>
            <EditOutlined />
            {/* {t("allPages.change")} */}
          </Link>

          <Delete style={{ marginLeft: "8px" }} onClick={() => onDelete(Id)} />
        </Actions>
      ),
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
