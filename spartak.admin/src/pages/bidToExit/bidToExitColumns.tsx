import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { statuses } from "common/constants/kids";
import { routePaths } from "common/constants/routePaths";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { BidToExitEntity } from "common/interfaces/kids";
import { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SelectField } from "ui/SelectField";

type Props = {
  access: boolean;
  updateStatus: (status: BidToExitEntity) => void;
};

export const getBidToExitListColumns = ({ access, updateStatus }: Props): ColumnsType<BidToExitEntity> => {
  return [
    {
      title: <Title>{t("kids.bidDate")}</Title>,
      dataIndex: "CreatedUtc",
      showSorterTooltip: false,
      sorter: true,
      width: 160,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
    {
      title: <Title>{t("kids.cardNumber")}</Title>,
      dataIndex: "SpartakKidsCardNumber",
      showSorterTooltip: false,
      width: 150,
      sorter: true,
    },
    {
      title: <Title>{t("kids.childName")}</Title>,
      dataIndex: `ChildName`,
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: <Title>{t("kids.growth")}</Title>,
      dataIndex: "ChildHeight",
      showSorterTooltip: false,
      width: 100,
      sorter: true,
    },
    {
      title: <Title>{t("kids.parentName")}</Title>,
      dataIndex: "ParentName",
      showSorterTooltip: false,
      sorter: true,
    },
    {
      title: <Title>{t("kids.email")}</Title>,
      dataIndex: "Email",
      showSorterTooltip: false,
      width: 200,
      sorter: true,
    },
    {
      title: <Title>{t("kids.telephone")}</Title>,
      dataIndex: "Phone",
      showSorterTooltip: false,
      width: 150,
      sorter: true,
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "PlayerToFieldRequestStatus",
      showSorterTooltip: false,
      sorter: true,
      width: 200,
      render: (status, item) => (
        <SelectField
          placeholder={t("allPages.status")}
          options={statuses()}
          defaultValue={status}
          style={{ width: 180 }}
          onChange={(value) => updateStatus({ ...item, PlayerToFieldRequestStatus: value })}
        />
      ),
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: 180,
          render: (_, { Id }) => (
            <Actions>
              <Link to={routePaths.form.edit(Id)}>
                <EditOutlined /> {t("kids.additionally")}
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
