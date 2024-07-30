import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import i18next from "i18next";
import { addNotification, getAllNotifications, removeNotification, updateNotification } from "../../api/requests/notifications";
import type { INotificationFilters, TUnionNotification } from "../../api/dto/users/INotificationAwait";
import type { IAddNotification } from "../../api/dto/users/INotificationAwait";

export const getNotificationsAwait = createAsyncThunk(
  "notifications/getNotificationsAwait",
  async ({ filters, isHistory }: { filters: INotificationFilters; isHistory: boolean }) => await getAllNotifications({ filters, isHistory })
);

export const addNotificationAwait = createAsyncThunk("notifications/addNotificationAwait", async (data: IAddNotification) => {
  await addNotification(data);
  message.success(i18next.t("success.create.notification"));
});

export const updateNotificationAwait = createAsyncThunk(
  "notifications/updateNotificationAwait",
  async (dataNotification: TUnionNotification) => {
    const notificationUpdated = await updateNotification(dataNotification);
    message.success(i18next.t("success.update.notification"));

    return notificationUpdated;
  }
);

export const deleteNotificationAwait = createAsyncThunk("notifications/deleteNotificationsAwait", async (id: string) => {
  await removeNotification(id);
  message.success(i18next.t("success.delete.notification" + "."));
});
