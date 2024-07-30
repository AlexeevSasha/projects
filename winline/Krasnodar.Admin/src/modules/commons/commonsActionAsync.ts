import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDeepLinks } from "../../api/requests/deepLinks";
import { getCities } from "../../api/requests/cities";
import type { IDeepLink } from "../../api/dto/IDeepLink";
import type { ICity } from "../../api/dto/ICity";

export const getDeepLinksThunk = createAsyncThunk<IDeepLink[]>("commons/getDeepLinks", async () => await getDeepLinks());

export const getCitiesThunk = createAsyncThunk<ICity[]>("commons/getCities", async () => await getCities());
