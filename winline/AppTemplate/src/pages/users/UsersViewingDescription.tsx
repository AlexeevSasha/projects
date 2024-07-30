import React from "react";
import { Drawer } from "antd";
import { getFormatedDate } from "../../common/helpers/getFormatedDate";
import { UpText, ItemText, FirstFieldItemText } from "../../ui/descriptionText";
import { phoneNumberFormatted } from "../../common/helpers/phoneNumbersFormatted";
import type { IUser } from "../../api/dto/users/IUser";
import { useTranslation } from "react-i18next";

interface IProps {
  userDescription?: IUser;
  onClose(): void;
}

export const UsersViewingDescription = React.memo(({ userDescription, onClose }: IProps) => {
  const { t } = useTranslation();

  return (
    <Drawer
      title={<UpText>{t("users.description.title")}</UpText>}
      headerStyle={{ borderBottom: "none" }}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!userDescription}
      width={560}
    >
      <ItemText>
        <FirstFieldItemText>{t("users.lastName")}:</FirstFieldItemText>
        <span>
          {userDescription?.lastName || userDescription?.firstName
            ? userDescription?.lastName?.trim() + " " + userDescription?.firstName?.trim()
            : t("common.missing")}
        </span>
      </ItemText>
      <ItemText>
        <FirstFieldItemText>{t("common.email")}</FirstFieldItemText>
        <span>{userDescription?.email ?? t("common.missing")}</span>
      </ItemText>
      <ItemText>
        <FirstFieldItemText>{t("users.createdUtc")}:</FirstFieldItemText>
        <span>{getFormatedDate(userDescription?.createdUtc)}</span>
      </ItemText>
      <ItemText>
        <FirstFieldItemText>{t("users.phone")}:</FirstFieldItemText>
        <span>{phoneNumberFormatted(userDescription?.phone)}</span>
      </ItemText>
    </Drawer>
  );
});
