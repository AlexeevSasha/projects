import { createSlice } from "@reduxjs/toolkit";
import { LoyaltyEntity } from "common/interfaces/loyalty";
import { SelectFieldOption } from "ui/SelectField";
import { getEventList, getLoyaltyByFilter, getLoyaltyById, getSectorList } from "./loyaltyActionAsync";
import i18n from "i18next";
import { formatInMoscowDate } from "common/helpers/getFormatedDate";

export type LoyaltyState = {
  isLoading: boolean;
  count: number;
  items?: LoyaltyEntity[];
  entity?: LoyaltyEntity;
  events: SelectFieldOption[];
  sectors: SelectFieldOption[];
};

export const loyaltyInitialState: LoyaltyState = {
  isLoading: false,
  count: 0,
  events: [],
  sectors: [],
};

export const { actions: loyaltyActions, reducer: loyaltyReducer } = createSlice({
  name: "loyalty",
  initialState: loyaltyInitialState,
  reducers: {
    resetEntity(state) {
      state.entity = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoyaltyByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoyaltyByFilter.fulfilled, (state, { payload }) => {
        state.count = payload.count;
        state.items = payload.items;
        state.isLoading = false;
      })
      .addCase(getLoyaltyByFilter.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getLoyaltyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoyaltyById.fulfilled, (state, { payload }) => {
        state.entity = payload;
        state.isLoading = false;
      })
      .addCase(getLoyaltyById.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getEventList.fulfilled, (state, { payload }) => {
        const locale = i18n.language === "ru" ? "Ru" : "En";
        state.events = payload.items.map(({ Event, MatchStartDateTime }) => ({
          value: Event.Id,
          label: `${Event.Name[locale]} ${formatInMoscowDate(MatchStartDateTime)}`,
        }));
      })

      .addCase(getSectorList.fulfilled, (state, { payload }) => {
        state.sectors = payload.map(({ Id, Name }) => ({ value: Id, label: Name }));
      });
  },
});
