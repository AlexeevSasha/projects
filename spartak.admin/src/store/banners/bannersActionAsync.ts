import { createAsyncThunk } from "@reduxjs/toolkit";
import { advRepository } from "api/advRepository";
import { BannerEntity, BannerLocation, BannersFiltersType, BannersResponce } from "common/interfaces/banners";
import { ThunkApiType } from "common/interfaces/common";

export const getBannersByFilter = createAsyncThunk<BannersResponce, BannersFiltersType, ThunkApiType>(
  "banner/byFilter",
  (filters, { rejectWithValue }) => advRepository.fetchByFilter(filters).catch((error) => rejectWithValue({ error }))
);

export const getBanner = createAsyncThunk<BannerEntity, BannerEntity["Id"], ThunkApiType>(
  "banner/byId",
  (id, { rejectWithValue }) => advRepository.fetchById(id).catch((error) => rejectWithValue({ error }))
);

export const addBanner = createAsyncThunk<BannerEntity, BannerEntity, ThunkApiType>(
  "banner/create",
  (id, { rejectWithValue }) => advRepository.add(id).catch((error) => rejectWithValue({ error }))
);

export const updateBanner = createAsyncThunk<BannerEntity, BannerEntity, ThunkApiType>(
  "banner/update",
  (id, { rejectWithValue }) => advRepository.update(id).catch((error) => rejectWithValue({ error }))
);

export const deleteBanner = createAsyncThunk<void, BannerEntity["Id"], ThunkApiType>(
  "banner/delete",
  (id, { rejectWithValue }) => advRepository.remove(id).catch((error) => rejectWithValue({ error }))
);

export const getBannerLocations = createAsyncThunk<BannerLocation[], undefined, ThunkApiType>(
  "banner/locations",
  (_, { rejectWithValue }) => advRepository.fetchLocations().catch((error) => rejectWithValue({ error }))
);

export const hideBanner = createAsyncThunk<
  void,
  { Id: BannerEntity["Id"]; IsHidden: BannerEntity["IsHidden"] },
  ThunkApiType
>("banner/hide", (params, { rejectWithValue }) =>
  advRepository.hide(params.Id, params.IsHidden).catch((error) => rejectWithValue({ error }))
);
