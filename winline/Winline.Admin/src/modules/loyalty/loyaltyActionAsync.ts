import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ILoyalty, ILoyaltyFilters } from "../../api/dto/loyalty/ILoyalty";
import {
  addLoyalty,
  deleteLoyalty,
  endLoyalty,
  getAvailability,
  getEvents,
  getLoyalty,
  getLoyaltyReport,
  getLoyaltyType,
  getSectors,
  updateLoyalty
} from "../../api/requests/loyalty";
import { message } from "antd";
import i18next from "i18next";
import { ISelect } from "../../api/dto/ISelect";

export const getAllLoyalties = createAsyncThunk("loyalty/getLoyalty", async (request: ILoyaltyFilters) => await getLoyalty(request));

// export const getAvailabilityThunk = createAsyncThunk<ISelect[]>("loyalty/getAvailability", async () => await getAvailability());

export const getLoyaltyTypeThunk = createAsyncThunk<string[]>("loyalty/getLoyaltyType", async () => await getLoyaltyType());

export const getLoyaltyReportThunk = createAsyncThunk("loyalty/getLoyaltyType", async () => await getLoyaltyReport());

export const getEventsThunk = createAsyncThunk("loyalty/getEvents", async (clubId: string) => {
  const events = await getEvents(clubId);

  return events;
});

export const getSectorsThunk = createAsyncThunk("loyalty/getSectors", async (eventId: string) => {
  const sectors = await getSectors(eventId);

  return sectors;
});

export const addLoyaltyThunk = createAsyncThunk("loyalty/addLoyalty", async (data: ILoyalty) => {
  const loyalty = await addLoyalty(data);
  message.success(i18next.t("success.create.loyalty"));

  return loyalty;
});

export const updateLoyaltyThunk = createAsyncThunk("loyalty/updateLoyalty", async (data: ILoyalty) => {
  const loyalty = await updateLoyalty(data);
  message.success(i18next.t("success.update.loyalty"));

  return loyalty;
});

export const endLoyaltyThunk = createAsyncThunk("loyalty/endLoyalty", async (id: string) => {
  const response = await endLoyalty(id);
  message.success(i18next.t("success.end.loyalty"));

  return response;
});

export const deleteLoyaltyThunk = createAsyncThunk("loyalty/deleteLoyalty", async (id: string) => {
  await deleteLoyalty(id);
  message.success(i18next.t("success.delete.loyalty"));

  return;
});
