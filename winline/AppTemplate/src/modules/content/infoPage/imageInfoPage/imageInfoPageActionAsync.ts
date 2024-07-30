import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import i18next from "i18next";
import { IFilterContent } from "../../../../api/dto/content/IContent";
import { IImageInfoPage, IImageInfoPageResponse } from "../../../../api/dto/content/IImageInfoPage";
import { addContent, deleteContent, getContent, updateContent } from "../../../../api/requests/content";
import { camelizeKeys } from "../../../../common/helpers/transformKeysToLowerCase";
import { generateODataQueryContent } from "../../../../core/oDataQueryBuilders/content/generateODataQueryContent";

export const getAllImageInfoPageThunk = createAsyncThunk("imageInfoPage/getAllImageInfoPage", async (filters: IFilterContent) => {
  const res = await getContent(generateODataQueryContent(filters));
  const allImagesInfoPage = camelizeKeys(res.value).map((image: IImageInfoPageResponse) => ({
    ...image,
    additionalInfo: camelizeKeys(JSON.parse(image.additionalInfo))
  }));

  return { allImagesInfoPage, count: res["@odata.count"] };
});

export const addImageInfoPageThunk = createAsyncThunk("imageInfoPage/addImageInfoPage", async (image: IImageInfoPage | any) => {
  const newImageInfoPage = await addContent(
    JSON.stringify({
      ...image,
      additionalInfo: JSON.stringify(image.additionalInfo)
    })
  );
  message.success(i18next.t("success.create.marketing.imageInfoPage"));

  return newImageInfoPage;
});

export const updateImageInfoPageThunk = createAsyncThunk("imageInfoPage/updateImageInfoPage", async (image: IImageInfoPage) => {
  const res = await updateContent(
    image.id,
    JSON.stringify({
      ...image,
      additionalInfo: JSON.stringify(image.additionalInfo)
    })
  );

  message.success(i18next.t("success.update.marketing.imageInfoPage"));
  const updatedImageInfoPage = { ...res, additionalInfo: camelizeKeys(JSON.parse(res.additionalInfo)) };

  return updatedImageInfoPage;
});

export const deleteImageInfoPageThunk = createAsyncThunk("imageInfoPage/deleteImageInfoPage", async (id: string) => {
  await deleteContent(id);
  message.success(i18next.t("success.delete.marketing.imageInfoPage"));

  return;
});
