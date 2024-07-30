import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import i18next from "i18next";
import { IBanner, IBannerResponse } from "../../../api/dto/content/IBanner";
import { IFilterContent } from "../../../api/dto/content/IContent";
import {
  addContent,
  addContentImage,
  deleteContent,
  getContent,
  updateContent,
  updatePublishDateContent,
  updateStatusContent
} from "../../../api/requests/content";
import { camelizeKeys } from "../../../common/helpers/transformKeysToLowerCase";
import { generateODataQueryContent } from "../../../core/oDataQueryBuilders/content/generateODataQueryContent";

export const getAllBannersThunk = createAsyncThunk(
  "banner/getAllBanners",
  async ({ filters, mode }: { filters: IFilterContent; mode?: string }) => {
    const res = await getContent(generateODataQueryContent(filters, mode));
    const allBanners = camelizeKeys(res.value).map((banner: IBannerResponse) => {
      return {
        ...banner,
        additionalInfo: JSON.parse(banner.additionalInfo)
      };
    });

    return { allBanners, count: res["@odata.count"] };
  }
);

export const addBannerThunk = createAsyncThunk("banner/addBanner", async (banner: IBanner) => {
  const formDataImage = new FormData();
  formDataImage.append("formFile", banner.additionalInfo.image);
  formDataImage.append("ContentType", "Banner");
  const image = await addContentImage(formDataImage);
  const newBanner = await addContent(
    JSON.stringify({
      ...banner,
      contentType: "Banner",
      contentStatus: "Hidden",
      additionalInfo: JSON.stringify({
        ...banner.additionalInfo,
        image: image
      })
    })
  );
  message.success(i18next.t("success.create.marketing.banner"));

  return newBanner;
});

export const updateBannerThunk = createAsyncThunk("banner/updateBanner", async (banner: IBanner) => {
  const res = await updateContent(
    banner.id,
    JSON.stringify({
      ...banner,
      additionalInfo: JSON.stringify(banner.additionalInfo)
    })
  );

  message.success(i18next.t("success.update.marketing.banner.content"));
  const updatedBanner = { ...res, additionalInfo: camelizeKeys(JSON.parse(res.additionalInfo)) };

  return updatedBanner;
});

export const deleteBannerThunk = createAsyncThunk("banner/deleteBanner", async (id: string) => {
  await deleteContent(id);
  message.success(i18next.t("success.delete.marketing.banner"));

  return;
});

export const updateStatusBannerThunk = createAsyncThunk<void, { entity: IBanner; status: string }>(
  "banner/updateStatusBanner",
  async ({ entity, status }) => {
    await updateStatusContent(entity.id, status);
    message.success(i18next.t(`success.update.marketing.banner.status${status}`));
  }
);

export const updatePublishDataBannerThunk = createAsyncThunk("banner/updatePublishDataBanner", async (banner: IBanner, { dispatch }) => {
  try {
    await updatePublishDateContent(banner.id, banner.publishBefore as string);
    dispatch(updateBannerThunk(banner));
    message.success(i18next.t("success.update.marketing.publishDate"));
  } catch (err: any) {
    message.error(err.message);
  }
});
