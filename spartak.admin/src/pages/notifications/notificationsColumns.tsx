import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { routePaths } from "common/constants/routePaths";
import { NoticeEntity } from "common/interfaces/notifications";
import { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Delete } from "ui/Delete";
import { formatInMoscowDate } from "../../common/helpers/getFormatedDate";

type Props = {
  onDelete: (id: NoticeEntity["Id"]) => void;
  onPreview: (id: NoticeEntity) => void;
  access?: boolean;
  tab: string;
};

export const getNotificationsColumns = ({ onDelete, onPreview, access, tab }: Props) => {
  const columns: ColumnsType<NoticeEntity> = [
    {
      title: <Title>{t("notifications.noticeId")}</Title>,
      dataIndex: "Id",
      sorter: false,
      showSorterTooltip: false,
      ellipsis: true,
      width: 130,
      render: (text, row) => (
        <Link to="" onClick={() => onPreview(row)}>
          {text}
        </Link>
      ),
    },
    {
      title: <Title>{t("notifications.header")}</Title>,
      dataIndex: "Heading",
      sorter: false,
      showSorterTooltip: false,
      ellipsis: true,
      width: 210,
    },
    {
      title: <Title>{t("notifications.text")}</Title>,
      dataIndex: "Message",
      sorter: false,
      showSorterTooltip: false,
      ellipsis: true,
      width: "auto",
    },
    {
      title: <TimeTitle>{t("notifications.sendDateTime")}</TimeTitle>,
      dataIndex: "SendTime",
      sorter: true,
      showSorterTooltip: true,
      width: 160,
      render: (text) => formatInMoscowDate(text, { withTime: true }),
    },
  ];

  tab === "await" &&
    access &&
    columns.push({
      title: <Title>{t("allPages.action")}</Title>,
      dataIndex: "action",
      width: 170,
      fixed: "right",
      render: (_, { Id, Type }: Pick<NoticeEntity, "Id" | "Type">) => (
        <Actions>
          <Link to={`${Type}/${routePaths.form.edit(Id)}`}>
            <EditOutlined /> {t("allPages.change")}
          </Link>

          <Delete style={{ marginLeft: "8px" }} onClick={() => onDelete(Id)} />
        </Actions>
      ),
    });

  return columns;
};

const Title = styled.div`
  font-weight: 600;
  word-break: break-word;
  white-space: pre-line;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const TimeTitle = styled(Title)`
  width: 100px;
`;
