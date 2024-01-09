import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { LocaleType } from "../../common/interfaces/common";
import { IconEye } from "ui/IconEye";
import styled from "styled-components";

export interface ISubscriptionsColumns {
  FullName: LocaleType;
  Date: string;
  Id: string;
  IsHidden: boolean;
}

export const getPagesSubscriptionsColumns = (
  access: boolean,
  locale: "Ru" | "En",
  onView: (id: string, isHidden: boolean) => void
): ColumnsType<ISubscriptionsColumns> => {
  const columnTitle: ColumnType<ISubscriptionsColumns> = {
    title: t("allPages.title"),
    dataIndex: `FullName/${locale}`,
    sorter: true,
    showSorterTooltip: false,
    fixed: "left",
    width: "55%",
    render: (_, { FullName }) => FullName[locale],
  };
  const columnDateAndTime: ColumnType<ISubscriptionsColumns> = {
    title: t("allPages.dateTime"),
    dataIndex: "Date",
    sorter: true,
    showSorterTooltip: false,
    width: "9.2%",
  };
  const columnActions: ColumnType<ISubscriptionsColumns> = access
    ? {
        title: t("allPages.action"),
        key: "operation",
        align: "center",
        fixed: "right",
        width: "7%",
        render: (_, { Id, IsHidden }) => (
          <Actions>
            <IconEye onClick={() => onView(Id, !IsHidden)} value={IsHidden} />
            <Link to={routePaths.form.edit(Id)}>
              <EditOutlined /> {t("allPages.buttonsText.edit")}
            </Link>
          </Actions>
        ),
      }
    : {};

  return [columnTitle, columnDateAndTime, columnActions];
};

const Actions = styled.div`
  display: flex;
  align-items: center;
`;
