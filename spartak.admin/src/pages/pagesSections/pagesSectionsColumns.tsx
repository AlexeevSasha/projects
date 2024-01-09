import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { ISectionData } from "common/interfaces/pagesSections";
import { Link } from "react-router-dom";
import { t } from "i18next";

export const getPagesSectionsColumns = (access: boolean): ColumnsType<ISectionData> => {
  const columnTitle: ColumnType<ISectionData> = {
    title: t("allPages.page"),
    dataIndex: "name",
    sorter: false,
    showSorterTooltip: false,
    fixed: "left",
    width: access ? "30%" : "44%",
  };
  const columnLink: ColumnType<ISectionData> = {
    title: t("allPages.link"),
    dataIndex: "path",
    sorter: false,
    showSorterTooltip: false,
    width: "28%",
  };
  const columnPlace: ColumnType<ISectionData> = {
    title: t("allPages.scheme"),
    dataIndex: "schema",
    sorter: false,
    ellipsis: false,
    showSorterTooltip: false,
    width: "28%",
  };
  const columnActions: ColumnType<ISectionData> = access
    ? {
        title: t("allPages.action"),
        key: "operation",
        align: "center",
        fixed: "right",
        width: "14%",
        render: (_, { schema }) => (
          <Link to={routePaths.form.edit(schema)}>
            <EditOutlined /> {t("allPages.buttonsText.edit")}
          </Link>
        ),
      }
    : {};

  return [columnTitle, columnLink, columnPlace, columnActions];
};
