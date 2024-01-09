import { Drawer, Typography } from "antd";
import { theme } from "assets/theme/theme";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";
import { phoneNumberFormatted } from "common/helpers/phoneNumbersFormatted";
import type { User } from "common/interfaces/user";
import React from "react";
import { TFunction } from "react-i18next";
import styled, { css } from "styled-components";

interface IProps {
  userDescription?: User;
  t: TFunction<"translation">;
  onClose(): void;
}

export const UsersViewTableDesc = React.memo(({ userDescription, onClose, t }: IProps) => {
  return (
    <Drawer
      title={
        <UpText>{`${t("usersView.description.points.phone")} ${phoneNumberFormatted(userDescription?.phone)}`}</UpText>
      }
      headerStyle={{ borderBottom: "none" }}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!userDescription}
      width={560}
    >
      <ItemText>
        <FirstFieldItemText>{t("usersView.description.points.lastName")}</FirstFieldItemText>
        <span>
          {userDescription?.lastName || userDescription?.firstName
            ? userDescription?.lastName.trim() + " " + userDescription?.firstName.trim()
            : "отсутствует"}
        </span>
      </ItemText>
      <ItemText>
        <FirstFieldItemText>{t("usersView.description.points.email")}</FirstFieldItemText>
        <span>{userDescription?.email ?? "отсутствует"}</span>
      </ItemText>
      <ItemText>
        <FirstFieldItemText>{t("usersView.description.points.createdUtc")}</FirstFieldItemText>
        <span>{formatInMoscowDate(userDescription?.createdUtc)}</span>
      </ItemText>
    </Drawer>
  );
});

const normalStyles = css`
  font-style: normal;
  font-weight: normal;
  color: ${theme.colors.gray};
`;

export const UpText = styled(Typography.Paragraph)`
  ${normalStyles};
  font-size: 16px;
  line-height: 24px;
`;

export const ItemText = styled(Typography.Paragraph)`
  ${normalStyles};
  font-size: 14px;
  line-height: 22px;

  & > span:last-child {
    margin-left: 8px;
    color: ${theme.colors.middleGray};
  }
  & > a:last-child {
    margin-left: 5px;
  }
`;

export const FirstFieldItemText = styled.span`
  white-space: nowrap;
`;
