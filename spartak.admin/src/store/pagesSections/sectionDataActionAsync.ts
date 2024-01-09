import { createAsyncThunk } from "@reduxjs/toolkit";
import { pageStadiumInfoRepository } from "../../api/pageStadiumInfoRepository";
import { ISectionResponse } from "../../common/interfaces/ISectionResponse";

export const getSectionDataThunk = createAsyncThunk<ISectionResponse, string>(
  "section/getAllSections",
  async (type, { rejectWithValue }) => {
    return await pageStadiumInfoRepository.fetchByFilter(type).catch((error) => rejectWithValue({ error }));
  }
);
