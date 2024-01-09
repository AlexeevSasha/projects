import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { formatInMoscowDate } from "../../common/helpers/getFormatedDate";
import { Category } from "../../common/interfaces/mediaCategory";

type Props = {
  onDelete: (id: Category["Id"]) => void;
  access: boolean;
};

export const getMediaCategoriesColumns = ({ onDelete, access }: Props): ColumnsType<Category> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("mediaCategories.categoryColumn")}</Title>,
      dataIndex: ["CategoryName", locale],
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      width: access ? "50%" : "60%",
      render: (text) => <a href="#">{text}</a>,
    },
    {
      title: <Title>{t("allPages.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      width: "40%",
      render: (text) => formatInMoscowDate(text),
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: "10%",
          render: (_, { Id }) => (
            <Actions>
              <ActionContainer to={routePaths.form.edit(Id)}>
                <EditOutlined /> {t("allPages.change")}
              </ActionContainer>

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

const ActionContainer = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;
