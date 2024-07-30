import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFilterContent } from "../../../api/dto/content/IContent";
import { generateODataQueryContent } from "../../../core/oDataQueryBuilders/content/generateODataQueryContent";
import { IStory, IStoryResponse } from "../../../api/dto/content/IStory";
import { camelizeKeys } from "../../../common/helpers/transformKeysToLowerCase";
import {
  addContent,
  addContentImage,
  deleteContent,
  getContent,
  updateContent,
  updatePublishDateContent,
  updateStatusContent
} from "../../../api/requests/content";
import { message } from "antd";
import i18next from "i18next";

export const getAllStoryThunk = createAsyncThunk(
  "story/getAllStory",
  async ({ filters, mode }: { filters: IFilterContent; mode?: string }) => {
    const res = await getContent(generateODataQueryContent(filters, mode));
    const allStories = camelizeKeys(res.value).map((storyes: IStoryResponse) => ({
      ...storyes,
      additionalInfo: JSON.parse(storyes.additionalInfo)
    }));

    return { allStories, count: res["@odata.count"] };
  }
);

export const addStoryThunk = createAsyncThunk("story/addStory", async (dataStory: IStory) => {
  const formDataImage = new FormData();
  const formDataImageMini = new FormData();
  // ffff
  const formDataImageComponent = new FormData();
  const formDataImageComponentTwo = new FormData();
  dataStory.additionalInfo?.componentInfo?.[0]?.imageId &&
    formDataImageComponent.append("formFile", dataStory.additionalInfo?.componentInfo?.[0]?.imageId);
  dataStory.additionalInfo?.componentInfo?.[1]?.imageId &&
    formDataImageComponentTwo.append("formFile", dataStory.additionalInfo?.componentInfo?.[1]?.imageId);
  const imageComponentStory = dataStory.additionalInfo?.componentInfo?.[0]?.imageId ? await addContentImage(formDataImageComponent) : "";
  const imageComponentStoryTwo = dataStory.additionalInfo?.componentInfo?.[1]?.imageId
    ? await addContentImage(formDataImageComponentTwo)
    : "";
  // ffff
  formDataImage.append("formFile", dataStory.additionalInfo.image);
  formDataImageMini.append("formFile", dataStory.additionalInfo.imageMini);
  const image = await addContentImage(formDataImage);
  const imageMini = await addContentImage(formDataImageMini);
  const newStory = await addContent(
    JSON.stringify({
      ...dataStory,
      additionalInfo: JSON.stringify({
        ...dataStory.additionalInfo,
        image: image,
        imageMini: imageMini,
        componentInfo: dataStory.additionalInfo?.componentInfo
          ? dataStory.additionalInfo?.componentInfo
              .map((test, index) => ({
                ...test,
                imageId: index === 0 ? imageComponentStory : imageComponentStoryTwo
              }))
              .filter((item: any) => item.imageId)
          : []
      })
    })
  );
  message.success(i18next.t("success.create.marketing.story"));

  return newStory;
});

export const updateStoryThunk = createAsyncThunk("story/updateStory", async (storyUpdate: any) => {
  if (storyUpdate?.additionalInfo?.image instanceof File) {
    const formData = new FormData();
    formData.append("formFile", storyUpdate?.additionalInfo?.image);
    storyUpdate.additionalInfo.image = await addContentImage(formData);
  }
  if (storyUpdate.additionalInfo.imageMini instanceof File) {
    const formData = new FormData();
    formData.append("formFile", storyUpdate.additionalInfo.imageMini);
    storyUpdate.additionalInfo.imageMini = await addContentImage(formData);
  }
  if (
    storyUpdate?.additionalInfo?.componentInfo?.[0]?.imageId &&
    storyUpdate?.additionalInfo?.componentInfo?.[0]?.imageId instanceof File
  ) {
    const formData = new FormData();
    formData.append("formFile", storyUpdate?.additionalInfo?.componentInfo[0].imageId);
    storyUpdate.additionalInfo.componentInfo[0].imageId = await addContentImage(formData);
  }
  if (
    storyUpdate?.additionalInfo?.componentInfo?.[1]?.imageId &&
    storyUpdate?.additionalInfo?.componentInfo?.[1]?.imageId instanceof File
  ) {
    const formData = new FormData();
    formData.append("formFile", storyUpdate?.additionalInfo?.componentInfo[1].imageId);
    storyUpdate.additionalInfo.componentInfo[1].imageId = await addContentImage(formData);
  }
  const body = JSON.stringify({
    ...storyUpdate,
    additionalInfo: JSON.stringify({
      ...storyUpdate.additionalInfo,
      componentInfo: storyUpdate.additionalInfo.componentInfo ? storyUpdate.additionalInfo.componentInfo : []
    })
  });

  const res = await updateContent(storyUpdate.id, body);
  message.success(i18next.t("success.update.marketing.story.content"));
  const updatedStory = { ...res, additionalInfo: camelizeKeys(JSON.parse(res.additionalInfo)) };

  return updatedStory;
});

export const updatePublishDataStoryThunk = createAsyncThunk("story/updatePublishDataStory", async (storyData: IStory, { dispatch }) => {
  try {
    if (storyData.publishBefore || storyData.publishBefore === "") {
      await updatePublishDateContent(storyData.id, storyData.publishBefore);
      message.success(i18next.t("success.update.marketing.publishDate"));
    }
  } catch (err: any) {
    message.error(err.message);
  }
});

export const updateStatusStoryThunk = createAsyncThunk<void, { entity: IStory; status: string }>(
  "story/updateStatusStory",
  async ({ entity, status }) => {
    await updateStatusContent(entity.id, status);
    // status && status !== updatedStory.status && dispatch(dispatch(story.actions.removeStory(id)));

    message.success(i18next.t(`success.update.marketing.story.status${status}`));
  }
);

export const removeStoryThunk = createAsyncThunk("story/removeStory", async (entity: IStory) => {
  await deleteContent(entity.id);
  message.success(i18next.t("success.delete.marketing.story.content"));

  return;
});
