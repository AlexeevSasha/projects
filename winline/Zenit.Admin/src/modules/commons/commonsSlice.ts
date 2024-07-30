import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDeepLinksThunk, getCitiesThunk } from "./commonsActionAsync";
import { ICity } from "../../api/dto/ICity";
import { IDeepLink } from "../../api/dto/IDeepLink";

const initialState: { deepLinks: IDeepLink[]; cities: ICity[] } = {
  deepLinks: [],
  cities: []
};

export const commonsSlice = createSlice({
  name: "commons",
  initialState,
  reducers: {},
  extraReducers: {
    [getDeepLinksThunk.fulfilled.type]: (state, { payload }: PayloadAction<IDeepLink[]>) => {
      state.deepLinks = payload;
    },
    [getCitiesThunk.fulfilled.type]: (state, { payload }: PayloadAction<ICity[]>) => {
      state.cities = payload;
    }
  }
});
