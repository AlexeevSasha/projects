import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getClubsThunk, getCitiesThunk } from "./commonsActionAsync";
import type { ICity } from "../../api/dto/ICity";
import type { IClub } from "../../api/dto/IClub";

const initialState: { clubs: IClub[]; cities: ICity[] } = {
  clubs: [],
  cities: []
};

export const commonsSlice = createSlice({
  name: "commons",
  initialState,
  reducers: {},
  extraReducers: {
    [getClubsThunk.fulfilled.type]: (state, { payload }: PayloadAction<IClub[]>) => {
      state.clubs = payload;
    },
    [getCitiesThunk.fulfilled.type]: (state, { payload }: PayloadAction<ICity[]>) => {
      state.cities = payload;
    }
  }
});
