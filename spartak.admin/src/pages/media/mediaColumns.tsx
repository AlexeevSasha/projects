import { EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { Media } from "common/interfaces/media";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";

type Props = {
  onDelete: (id: Media["Id"]) => void;
  access: boolean;
};

export const getMediaColumns = ({ onDelete, access }: Props): ColumnsType<Media> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("media.header")}</Title>,
      dataIndex: ["MediaHeader", locale],
      sorter: true,
      width: access ? "40%" : "46%",
      showSorterTooltip: false,
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "MediaStatus",
      showSorterTooltip: false,
      sorter: true,
      width: "12%",
      render: (_, entity) => {
        const isPlanned = new Date(entity.PublishDateTime).getTime() > Date.now();

        return (
          <Tag color={entity.IsDraft ? "cyan" : isPlanned ? "gold" : "green"}>
            {t(`allPages.statuses.${entity.IsDraft ? "Draft" : isPlanned ? "Planned" : "Published"}`)}
          </Tag>
        );
      },
    },
    {
      title: <Title>{t("media.type")}</Title>,
      dataIndex: "MediaType",
      sorter: true,
      showSorterTooltip: false,
      width: "12%",
      ellipsis: true,
      render: (text: string) => (text === "None" ? "" : t(`media.types.${text.toLowerCase()}`)),
    },
    {
      title: <Title>{t("media.section")}</Title>,
      dataIndex: "Section",
      sorter: true,
      showSorterTooltip: false,
      width: access ? "12%" : "18%",
      ellipsis: true,
      render: (text) => t(`allPages.sections.${text}`),
    },
    {
      title: <Title>{t("allPages.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      sorter: true,
      showSorterTooltip: false,
      width: "12%",
      render: (text) => <TextStyles>{formatInMoscowDate(text)}</TextStyles>,
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          fixed: "right",
          width: 170,
          render: (_, { Id }) => (
            <Actions>
              <Link to={routePaths.form.edit(Id) + "/info"}>
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
`;

const TextStyles = styled.div<{ color?: string; textAlign?: string }>`
  text-align: ${({ textAlign }) => textAlign || "left"};
  color: ${theme.colors.gray};
`;
