import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClubs } from "../../api/requests/clubs";
import { getCities } from "../../api/requests/cities";
import type { IClub } from "../../api/dto/IClub";
import type { ICity } from "../../api/dto/ICity";

export const getClubsThunk = createAsyncThunk<IClub[]>("commons/getClubs", async () => await getClubs());

export const getCitiesThunk = createAsyncThunk<ICity[]>("commons/getCities", async () => await getCities());
