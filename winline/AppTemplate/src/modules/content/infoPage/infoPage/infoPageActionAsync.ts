import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import i18next from "i18next";
import { IFilterContent } from "../../../../api/dto/content/IContent";
import { IInfoPage, IInfoPageResponse } from "../../../../api/dto/content/IInfoPage";
import { addContent, deleteContent, getContent, updateContent } from "../../../../api/requests/content";
import { camelizeKeys } from "../../../../common/helpers/transformKeysToLowerCase";
import { generateODataQueryContent } from "../../../../core/oDataQueryBuilders/content/generateODataQueryContent";

export const getAllInfoPageThunk = createAsyncThunk("infoPage/getAllInfoPage", async (filters: IFilterContent) => {
  const res = await getContent(generateODataQueryContent(filters));
  const allInfoPage = camelizeKeys(res.value).map((page: IInfoPageResponse) => ({
    ...page,
    additionalInfo: JSON.parse(page.additionalInfo)
  }));

  return { allInfoPage, count: res["@odata.count"] };
});

export const addInfoPageThunk = createAsyncThunk("infoPage/addInfoPage", async (page: IInfoPage) => {
  const newInfoPage = await addContent(
    JSON.stringify({
      ...page,
      additionalInfo: JSON.stringify(page.additionalInfo)
    })
  );
  message.success(i18next.t("success.create.marketing.infoPage"));

  return newInfoPage;
});

export const updateInfoPageThunk = createAsyncThunk("infoPage/updateInfoPage", async (page: IInfoPage) => {
  const res = await updateContent(
    page.id,
    JSON.stringify({
      ...page,
      additionalInfo: JSON.stringify(page.additionalInfo)
    })
  );

  message.success(i18next.t("success.update.marketing.infoPage"));
  const updatedInfoPage = { ...res, additionalInfo: camelizeKeys(JSON.parse(res.additionalInfo)) };

  return updatedInfoPage;
});

export const removeInfoPageThunk = createAsyncThunk("infoPage/deleteInfoPage", async (id: string) => {
  await deleteContent(id);
  message.success(i18next.t("success.delete.marketing.infoPage"));

  return;
});
