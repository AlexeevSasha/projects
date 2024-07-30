import { Divider, Drawer } from "antd";
import { ItemText, UpText } from "../../../../ui/descriptionText";
import { getFormatedDate } from "../../../../common/helpers/getFormatedDate";
import type { TUnionNotification } from "../../../../api/dto/users/INotificationAwait";
import { useTranslation } from "react-i18next";
import { formsConstantsValidation } from "../../../../common/constants/formsConstantsValidation";
import { useSelector } from "react-redux";
import { StateType } from "../../../../core/redux/store";

interface IProps {
  notification?: TUnionNotification;
  onClose(): void;
}

export const NotificationDescription = ({ notification, onClose }: IProps) => {
  const { t } = useTranslation();
  const { deepLinks } = useSelector((state: StateType) => state.commons);
  const linkName = deepLinks.find((item) => notification?.linkValue === item?.link);

  return (
    <Drawer
      title={<UpText>{`${t("common.id") + ":"} ${notification?.id}`}</UpText>}
      headerStyle={{ borderBottom: "none", paddingBottom: "0" }}
      closable
      destroyOnClose={true}
      visible={!!notification}
      onClose={onClose}
      width={560}
    >
      <ItemText>
        <span>{t("common.createdUtc")}:</span>
        <span>{getFormatedDate(notification?.createdUtc)}</span>
      </ItemText>
      <ItemText>
        <span>{t("users.notifications.type")}:</span>
        <span>{t("users.notifications.description.title", { type: notification?.type })}</span>
      </ItemText>
      {notification?.type === "Push" && (
        <ItemText>
          <span>OS:</span>
          <span>{notification.os?.join(", ")}</span>
        </ItemText>
      )}
      <Divider />
      {notification?.type === "Push" && (
        <ItemText>
          <span>{t("common.link")}:</span>
          {notification.typeLink === "HyperLink" ? (
            <a href={notification?.linkValue ?? ""}>{notification?.linkValue ?? "-"}</a>
          ) : (
            <span>{linkName?.name ?? "-"}</span>
          )}
        </ItemText>
      )}
      {notification?.type !== "SMS" && (
        <ItemText>
          <span>{t("common.heading")}:</span>
          <span>{notification?.heading}</span>
        </ItemText>
      )}
      <ItemText>
        <span>{t("common.text")}:</span>
        <span>{notification?.message}</span>
      </ItemText>
      <Divider />
      <ItemText>
        <span>{t("common.sendTime")}:</span>
        <span>{getFormatedDate(notification?.sendTime, formsConstantsValidation.dateTimeFormat)}</span>
      </ItemText>
    </Drawer>
  );
};
