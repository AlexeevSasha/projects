import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { INotification } from "../../api/dto/users/INotificationAwait";
import { addNotificationAwait, deleteNotificationAwait, getNotificationsAwait, updateNotificationAwait } from "./notificationsActionAsync";

export const usersNotificationsAdapter = createEntityAdapter<INotification>();

export const usersNotificationsSlice = createSlice({
  name: "usersNotifications",
  initialState: usersNotificationsAdapter.getInitialState<{ isLoading: boolean; count: number }>({
    isLoading: false,
    count: 0
  }),
  reducers: {},
  extraReducers: {
    [getNotificationsAwait.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getNotificationsAwait.fulfilled.type]: (
      state,
      { payload }: PayloadAction<{ allNotificationsAwait: INotification[]; count: number }>
    ) => {
      usersNotificationsAdapter.setAll(state, payload.allNotificationsAwait);
      state.count = payload.count;
      state.isLoading = false;
    },
    [getNotificationsAwait.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [addNotificationAwait.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addNotificationAwait.fulfilled.type]: (state) => {
      state.count += 1;
      state.isLoading = false;
    },
    [addNotificationAwait.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [updateNotificationAwait.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateNotificationAwait.fulfilled.type]: (state, { payload }: PayloadAction<INotification>) => {
      usersNotificationsAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.isLoading = false;
    },
    [updateNotificationAwait.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteNotificationAwait.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteNotificationAwait.fulfilled.type]: (state) => {
      state.count -= 1;
      state.isLoading = false;
    },
    [deleteNotificationAwait.rejected.type]: (state) => {
      state.isLoading = false;
    }
  }
});
