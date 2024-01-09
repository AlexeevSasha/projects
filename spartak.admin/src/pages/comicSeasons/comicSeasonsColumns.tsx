import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { ComicSessonEntity } from "common/interfaces/kids";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";

type Props = {
  onDelete: (id: ComicSessonEntity["Id"]) => void;
  access: boolean;
};

export const getComicSeasonsColumns = ({ access, onDelete }: Props): ColumnsType<ComicSessonEntity> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("kids.seasons")}</Title>,
      dataIndex: ["ComicSeasonName", locale],
      showSorterTooltip: false,
      sorter: true,
      ellipsis: true,
      render: (text) => <RedText>{text}</RedText>,
    },
    {
      title: <Title>{t("allPages.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => formatInMoscowDate(text),
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          width: 170,
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
  gap: 8px;
`;

const RedText = styled.div`
  font-weight: 400;
  color: ${theme.colors.red1};
`;
