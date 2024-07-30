import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import i18next from "i18next";
import { createBanner, deleteBanner, getBanners, updateBanner } from "../../api/requests/adv";
import type { IAdv, IAdvFilters } from "../../api/dto/adv/IAdv";

export const getBannersThunk = createAsyncThunk("adv/getAllBanners", async (request: IAdvFilters) => await getBanners(request));

export const createBannerThunk = createAsyncThunk("adv/addBanner", async (data: IAdv) => {
  const banner = await createBanner(data);
  message.success(i18next.t("success.create.adv"));

  return banner;
});

export const updateBannerThunk = createAsyncThunk("adv/updateBanner", async (data: IAdv) => {
  const banner = await updateBanner(data);
  message.success(i18next.t("success.update.adv"));

  return banner;
});

export const deleteBannerThunk = createAsyncThunk("adv/deleteBanner", async (id: string) => {
  await deleteBanner(id);
  message.success(i18next.t("success.delete.adv"));

  return;
});
