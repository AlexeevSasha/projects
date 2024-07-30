import { Descriptions, Drawer } from "antd";
import { getFormatedDate } from "../../common/helpers/getFormatedDate";
import { phoneNumberFormatted } from "../../common/helpers/phoneNumbersFormatted";
import { useTranslation } from "react-i18next";
import type { IUser } from "../../api/dto/users/IUser";
import type { ICity } from "../../api/dto/ICity";

interface IProps {
  userDescription?: IUser;
  cities: ICity[];
  onClose(): void;
}

export const UsersViewingDescription = ({ userDescription, onClose, cities }: IProps) => {
  const { t } = useTranslation();

  const name =
    userDescription?.lastName || userDescription?.firstName || userDescription?.middleName
      ? userDescription?.lastName?.trim() + " " + userDescription?.firstName?.trim() + " " + (userDescription?.middleName?.trim() ?? "")
      : t("common.missing");

  return (
    <Drawer
      title={t("users.description.title")}
      closable={true}
      destroyOnClose={true}
      onClose={onClose}
      visible={!!userDescription}
      width={560}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.id")}>{userDescription?.id}</Descriptions.Item>
        <Descriptions.Item label={t("users.lastName")}>{name}</Descriptions.Item>
        <Descriptions.Item label={t("common.email")}>{userDescription?.email}</Descriptions.Item>
        <Descriptions.Item label={t("common.createdUtc")}>{getFormatedDate(userDescription?.createdUtc)}</Descriptions.Item>
        <Descriptions.Item label={t("users.phone")}>{phoneNumberFormatted(userDescription?.phone)}</Descriptions.Item>
        <Descriptions.Item label={t("users.city")}>{cities.find((city) => city.id === userDescription?.cityId)?.nameRu}</Descriptions.Item>
        <Descriptions.Item label={t("users.os")}>{userDescription?.mobilePlatforms?.join(",")}</Descriptions.Item>
        <Descriptions.Item label={t("users.registerAgree")}>
          {userDescription?.allowedToUseWinLine ? t("common.yes") : t("common.no")}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
