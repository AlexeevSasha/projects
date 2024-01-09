import { EditOutlined } from "@ant-design/icons";
import { Image, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { theme } from "assets/theme/theme";
import { noImage } from "common/constants/noImage";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { Trainer, TrainerDto } from "common/interfaces/trainers";
import i18n, { t } from "i18next";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";

type Props = {
  onDelete: (id: Trainer["Id"]) => void;
  access: boolean;
};

export const getClubsTrainersColumns = ({ onDelete, access }: Props): ColumnsType<TrainerDto> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("allPages.order")}</Title>,
      dataIndex: "SortOrder",
      width: "14%",
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      render: (text) => <TextStyles textAlign={"center"}>{text}</TextStyles>,
    },
    {
      title: <Title>{t("allPages.photo")}</Title>,
      dataIndex: "ImageUrl",
      width: "14%",
      showSorterTooltip: false,
      ellipsis: true,
      render: (text) => <Image src={text} fallback={noImage} width={24} style={{ borderRadius: "50%" }} />,
    },
    {
      title: <Title>{t("allPages.fio")}</Title>,
      dataIndex: ["FullName", locale],
      sorter: true,
      width: access ? "16%" : "30%",
      showSorterTooltip: false,
      render: (text) => <Link to={"##"}>{text}</Link>,
    },
    {
      title: <Title>{t("allPages.position")}</Title>,
      dataIndex: ["Position", locale],
      sorter: true,
      width: "14%",
      showSorterTooltip: false,
      render: (text) => <TextStyles>{text}</TextStyles>,
    },
    {
      title: <Title>{t("allPages.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      width: "14%",
      showSorterTooltip: false,
      render: (text: string) => (
        <Tag color={statusColors[text || "None"]}>{t(`allPages.statuses.${text || "None"}`)}</Tag>
      ),
    },
    {
      title: <Title>{t("allPages.createdUtc")}</Title>,
      dataIndex: "CreatedUtc",
      width: "14%",
      sorter: true,
      showSorterTooltip: false,
      render: (text) => <TextStyles>{formatInMoscowDate(text)}</TextStyles>,
    },
    access
      ? {
          title: <Title>{t("allPages.action")}</Title>,
          dataIndex: "action",
          width: "14%",
          fixed: "right",
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

const TextStyles = styled.div<{ color?: string; textAlign?: string }>`
  text-align: ${({ textAlign }) => textAlign || "left"};
  color: ${theme.colors.gray};
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
