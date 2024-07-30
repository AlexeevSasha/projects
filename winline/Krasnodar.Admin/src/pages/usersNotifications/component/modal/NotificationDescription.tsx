import { useTranslation } from "react-i18next";
import { Descriptions, Divider, Drawer } from "antd";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import type { INotification } from "../../../../api/dto/users/INotificationAwait";
import { showArrayCoincidenceItems } from "../../../../common/helpers/showArrayCoincidenceItems";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";

interface IProps {
  notification?: INotification;
  cities: { value: string; label: string }[];
  onClose(): void;
}

export const NotificationDescription = ({ notification, cities, onClose }: IProps) => {
  const { t } = useTranslation();
  const selectedCities = notification?.type === "Push" ? notification?.topicConditionInfo?.cityId : notification?.userFilter?.citiesList;
  const link =
    notification?.typeLink === "HyperLink" ? (
      <a href={notification?.linkValueUrl}>{notification?.linkValueUrl}</a>
    ) : (
      notification?.linkValueUrl
    );
  const userCities = selectedCities?.length ? showArrayCoincidenceItems(cities, selectedCities) : t("common.no");
  const deviceOS =
    notification?.topicConditionInfo?.mobilePlatforms && notification.topicConditionInfo?.mobilePlatforms.length > 0
      ? notification.topicConditionInfo?.mobilePlatforms.join(",").split(", ")
      : t("common.no");

  return (
    <Drawer
      title={`${t("users.notifications.description.title")}`}
      closable
      destroyOnClose={true}
      visible={!!notification}
      onClose={onClose}
      width={560}
    >
      <Descriptions column={1}>
        <Descriptions.Item label={t("common.id")}>{notification?.id}</Descriptions.Item>
        <Descriptions.Item label={t("common.type")}>{notification?.type}</Descriptions.Item>
        <Descriptions.Item label={t("common.createdUtc")}>{getFormatedDate(notification?.createdUtc)}</Descriptions.Item>
        <Descriptions.Item label={t("common.sendTime")}>
          {getFormatedDate(notification?.sendTime, formsConstantsValidation.dateTimeFormat)}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions column={1}>
        {notification?.type !== "SMS" && <Descriptions.Item label={t("common.heading")}>{notification?.heading}</Descriptions.Item>}
        <Descriptions.Item label={t("common.text")}>{notification?.message}</Descriptions.Item>
        {notification?.type === "Push" && <Descriptions.Item label={t("common.link")}>{link}</Descriptions.Item>}
      </Descriptions>
      <Divider />
      <Descriptions column={1} title={t("users.notifications.auditoryFilter")}>
        <Descriptions.Item label={t("users.notifications.city")}>{userCities}</Descriptions.Item>
        {notification?.type === "Push" && (
          <>
            <Descriptions.Item label={t("users.notifications.deviceOS")}>{deviceOS}</Descriptions.Item>
            <Descriptions.Item label={t("users.notifications.over18")}>
              {notification?.topicConditionInfo?.over18 ? t("common.yes") : t("common.no")}
            </Descriptions.Item>
            <Descriptions.Item label={t("users.notifications.policyAgreement")}>
              {notification?.topicConditionInfo?.winline ? t("common.yes") : t("common.no")}
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </Drawer>
  );
};
