import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getDeepLinksThunk} from "./commonsActionAsync";
import {IDeepLink} from "../../api/dto/IDeepLink";

const initialState: {deepLinks: IDeepLink[]}= {
  deepLinks: []
};

export const commonsSlice = createSlice({
  name: 'commons',
  initialState,
  reducers: {},
  extraReducers: {
    [getDeepLinksThunk.fulfilled.type]: (state, {payload}: PayloadAction<IDeepLink[]>) => {
      state.deepLinks = payload;
    }
  }
});
