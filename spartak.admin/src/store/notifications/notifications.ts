import { createSlice } from "@reduxjs/toolkit";
import { getNotificationByExternalId, getNotificationById, getNotificationsByFilter } from "./notificationsActionAsync";
import { NoticeEntity } from "common/interfaces/notifications";
import { IDeepLinks } from "common/interfaces/IDeepLinks";

export type NotificationsState = {
  isLoading: boolean;
  count: number;
  items?: NoticeEntity[];
  notice?: NoticeEntity;
  deepLinks?: IDeepLinks[];
};

export const notificationsInitialState: NotificationsState = {
  isLoading: false,
  count: 0,
};

export const { actions: notificationsActions, reducer: notificationsReducer } = createSlice({
  name: "notifications",
  initialState: notificationsInitialState,
  reducers: {
    resetNotice(state) {
      state.notice = undefined;
    },

    setDeepLinks(state, { payload }) {
      state.deepLinks = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotificationsByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.items = payload.items;
        state.isLoading = false;
      })
      .addCase(getNotificationsByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getNotificationByExternalId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotificationByExternalId.fulfilled, (state, { payload }) => {
        state.notice = payload;
        state.isLoading = false;
      })
      .addCase(getNotificationByExternalId.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getNotificationById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotificationById.fulfilled, (state, { payload }) => {
        state.notice = payload;
        state.isLoading = false;
      })
      .addCase(getNotificationById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
