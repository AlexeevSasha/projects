import { get, post, put, remove } from "../baseRequest";
import { generateODataQueryNotifications } from "../../core/oDataQueryBuilders/users/generateODataQueryNotifications";
import type { INotificationFilters, INotification } from "../dto/users/INotificationAwait";

export const getAllNotifications = async ({ filters, isHistory }: { filters: INotificationFilters; isHistory: boolean }) => {
  const response = await get(
    `${process.env.REACT_APP_ADMIN}/odata/Notification?${generateODataQueryNotifications(filters, isHistory)}`,
    "application/json"
  );

  return { allNotificationsAwait: response.value, count: response["@odata.count"] };
};

const notificationsAddRequests: Record<string, string> = {
  Push: "/Notification/AddPush",
  SMS: "/Notification/AddSms",
  Email: "/Notification/AddEmail"
};

export const addNotification = async (body: INotification) => {
  const notificationWithTypeAddRequest = notificationsAddRequests[body.type];
  const newNotification: INotification = await post(
    `${process.env.REACT_APP_ADMIN}${notificationWithTypeAddRequest}`,
    JSON.stringify(body),
    "application/json"
  );

  return { newNotification: { ...newNotification, type: body.type } };
};

const notificationsUpdateRequests: Record<string, string> = {
  Push: "/Notification/UpdatePush",
  SMS: "/Notification/UpdateSms",
  Email: "/Notification/UpdateEmail"
};

export const updateNotification = async (body: INotification) => {
  const notificationWithTypeUpdateRequest = notificationsUpdateRequests[body.type];
  await put(`${process.env.REACT_APP_ADMIN}${notificationWithTypeUpdateRequest}?id=${body.id}`, JSON.stringify(body), "application/json");

  return body;
};

export const removeNotification = async (id: string) => {
  await remove(`${process.env.REACT_APP_ADMIN}/Notification/DeleteNotification?id=${id}`);

  return id;
};
