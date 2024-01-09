import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatInMoscowDate } from "../../common/helpers/getFormatedDate";

export const getStadiumColumns = ({ access }: { access: boolean }): ColumnsType<any> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("dirStadiums.table.columns.name")}</Title>,
      dataIndex: ["FullName", locale],
      sorter: true,
      showSorterTooltip: false,
      width: "70%",
      ellipsis: true,
    },
    {
      title: <Title>{t("dirStadiums.table.columns.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      width: access ? "16%" : "30%",
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text),
    },
    access
      ? {
          title: <Title>{t("dirStadiums.table.columns.action")}</Title>,
          dataIndex: "action",
          width: "14%",
          render: (_, { Id }) => (
            <Link to={routePaths.form.edit(Id)}>
              <EditOutlined /> {t("dirStadiums.table.change")}
            </Link>
          ),
        }
      : {},
  ];
};

const Title = styled.div`
  font-weight: 600;
`;
