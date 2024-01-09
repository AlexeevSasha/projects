import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { theme } from "assets/theme/theme";
import { routePaths } from "common/constants/routePaths";
import { statusColors } from "common/constants/status";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import i18n, { t } from "i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SpecialOfferRequest } from "../../common/interfaces/specialOffer";

type Props = {
  access: boolean;
  handleDelete: (id: SpecialOfferRequest["Id"]) => void;
};

export const specialOfferColumns = ({ access, handleDelete }: Props): ColumnsType<SpecialOfferRequest> => {
  const locale = i18n.language === "ru" ? "Ru" : "En";

  return [
    {
      title: <Title>{t("specialOffer.heading")}</Title>,
      dataIndex: ["Header", locale],
      sorter: true,
      showSorterTooltip: false,
      width: 419,
      ellipsis: true,
      render: (text) => <Item>{text}</Item>,
    },
    {
      title: <Title>{t("specialOffer.status")}</Title>,
      dataIndex: "Status",
      sorter: true,
      width: 159,
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text || "None"]}>{t(`specialOffer.statuses.${text || "None"}`)}</Tag>,
    },
    {
      title: <Title>{t("specialOffer.type")}</Title>,
      dataIndex: "Type",
      sorter: true,
      width: 215,
      showSorterTooltip: false,
      render: (text) => <Tag color={statusColors[text || "None"]}>{t(`specialOffer.types.${text}`)}</Tag>,
    },

    {
      title: <Title>{t("specialOffer.dateStart")}</Title>,
      dataIndex: "StartDate",
      showSorterTooltip: false,
      width: 213,

      sorter: true,
      render: (text) => <Item>{formatInMoscowDate(text, { withTime: true })}</Item>,
    },

    access
      ? {
          title: <Title>{t("specialOffer.action")}</Title>,
          fixed: "right",
          width: 138,
          render: (_, { Id }) => (
            <Actions style={{ gap: "10px" }}>
              <Link to={routePaths.form.edit(Id)}>
                <IconWrapper style={{ display: "flex", alignItems: "center", gap: "5px" }} isActive>
                  <EditOutlined />
                  {t("specialOffer.edit")}
                </IconWrapper>
              </Link>
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

const IconWrapper = styled.div<{ isActive?: boolean }>`
  color: ${({ isActive }) => theme.colors[isActive ? "red" : "black"]};
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
`;
