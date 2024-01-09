import { DeleteOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { IQuiz } from "common/interfaces/IQuiz";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  access: boolean;
  handleDelete: (Id: string) => void;
  download: (Id: string) => void;
  openPreview: (Id: string) => void;
};

export const quizColumns = ({ access, handleDelete, download, openPreview }: Props): ColumnsType<any> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("specialOffer.heading")}</Title>,
      dataIndex: ["Header", locale],
      sorter: true,
      showSorterTooltip: false,
      width: 305,
      ellipsis: true,
      render: (text, item) => <RedTitle onClick={() => openPreview(item.Id)}>{text}</RedTitle>,
    },
    {
      title: <Title>{t("queez.countParticipants")}</Title>,
      dataIndex: "TotalAcceptedUsers",
      sorter: true,
      width: 160,
      showSorterTooltip: false,
      render: (text) => <Item>{text}</Item>,
    },
    {
      title: <Title>{t("queez.dateStart")}</Title>,
      dataIndex: "StartPublish",
      showSorterTooltip: false,
      width: 180,
      sorter: true,
      render: (text) => <Item>{formatInMoscowDate(text, { withTime: true })}</Item>,
    },
    {
      title: <Title>{t("queez.dateEnd")}</Title>,
      dataIndex: "EndPublish",
      showSorterTooltip: false,
      width: 180,
      sorter: true,
      render: (text) => <Item>{formatInMoscowDate(text, { withTime: true })}</Item>,
    },

    {
      title: <Title>{t("specialOffer.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      width: 159,
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text || "None"]}>{t(`specialOffer.statuses.${text || "None"}`)}</Tag>,
    },
    access
      ? {
          title: <Title>{t("specialOffer.action")}</Title>,
          fixed: "right",
          width: 138,
          render: (_, { Id, Status, TotalAcceptedUsers }) => (
            <Actions style={{ gap: "10px" }}>
              <Link to={routePaths.form.edit(Id)}>
                <IconWrapper style={{ display: "flex", alignItems: "center", gap: "5px" }} isActive>
                  <EditOutlined />
                </IconWrapper>
              </Link>

              <IconWrapper
                isActive={(Status === "Completed" || Status === "Published") && !!TotalAcceptedUsers}
                onClick={() => {
                  (Status === "Completed" || Status === "Published") && !!TotalAcceptedUsers && download(Id);
                }}
              >
                <DownloadOutlined />
              </IconWrapper>
              <Delete onClick={() => handleDelete(Id)} />
            </Actions>
          ),
        }
      : {},
  ];
};

const Title = styled.div`
  font-weight: 600;
`;
const Item = styled.div`
  font-weight: 400;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const Delete = styled(DeleteOutlined)`
  color: ${theme.colors.red};
`;
const RedTitle = styled.div`
  font-size: 14px;
  color: ${theme.colors.red1};
  font-weight: 400;
  cursor: pointer;
`;

const IconWrapper = styled.div<{ isActive?: boolean }>`
  color: ${({ isActive }) => theme.colors[isActive ? "red" : "lightGray"]};
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
`;
