import { get, post, put, remove } from "../baseRequest";
import { generateODataQueryNotifications } from "../../core/oDataQueryBuilders/users/generateODataQueryNotifications";
import type { IAddNotification, INotificationFilters, TUnionNotification } from "../dto/users/INotificationAwait";

export const getAllNotifications = async ({ filters, isHistory }: { filters: INotificationFilters; isHistory: boolean }) => {
  const response = await get(
    `${process.env.REACT_APP_NOTIFICATION}/odata/Notification?${generateODataQueryNotifications(filters, isHistory)}`,
    "application/json"
  );

  return { allNotificationsAwait: response.value, count: response["@odata.count"] };
};

const notificationsAddRequests: Record<string, string> = {
  Push: "/Notification/AddPush",
  SMS: "/Notification/AddSms",
  Email: "/Notification/AddEmail"
};

export const addNotification = async (body: IAddNotification) => {
  const notificationWithTypeAddRequest = notificationsAddRequests[body.type];
  const newNotification: TUnionNotification = await post(
    `${process.env.REACT_APP_NOTIFICATION}${notificationWithTypeAddRequest}`,
    JSON.stringify({
      ...body,
      type: undefined
    }),
    "application/json"
  );

  return { newNotification: { ...newNotification, type: body.type } };
};

const notificationsUpdateRequests: Record<string, string> = {
  Push: "/Notification/UpdatePush",
  SMS: "/Notification/UpdateSms",
  Email: "/Notification/UpdateEmail"
};

export const updateNotification = async (body: TUnionNotification) => {
  const notificationWithTypeUpdateRequest = notificationsUpdateRequests[body.type];
  await put(
    `${process.env.REACT_APP_NOTIFICATION}${notificationWithTypeUpdateRequest}?id=${body.id}`,
    JSON.stringify({
      ...body
    }),
    "application/json"
  );

  return body;
};

export const removeNotification = async (id: string) => {
  await remove(`${process.env.REACT_APP_NOTIFICATION}/Notification/DeleteNotification?id=${id}`);

  return id;
};
