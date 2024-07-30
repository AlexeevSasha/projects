import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDeepLinks } from "../../api/requests/deepLinks";
import { IDeepLink } from "../../api/dto/IDeepLink";

export const getDeepLinksThunk = createAsyncThunk<IDeepLink[]>(
  "commons/getDeepLinks",
  async () => await getDeepLinks());
