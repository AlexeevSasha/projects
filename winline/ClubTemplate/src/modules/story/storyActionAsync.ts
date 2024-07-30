import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IStory, IStoryResponse, IStorySortUpdate } from "../../api/dto/content/story/story";
import type { IFilterContent } from "../../api/dto/content/content";
import {
  addContent,
  deleteContent,
  getContent,
  updateContent,
  updateSortOrder,
  updateEndPublicationDate,
  updateStatusContent,
  updateBeginningPublicationDate
} from "../../api/requests/content";
import { generateODataQueryContent } from "../../core/oDataQueryBuilders/content/generateODataContent";
import { message } from "antd";
import i18next from "i18next";
import { validationPublishDate } from "../../common/helpers/commonValidators/story/validationStory";
import camelcaseKeys from "camelcase-keys";

export const getAllStoryThunk = createAsyncThunk("story/getAllStory", async (filters: IFilterContent) => {
  const response = await getContent(generateODataQueryContent(filters));
  const allStories = response.value.map((story: IStoryResponse) => {
    return {
      ...story,
      additionalInfo: JSON.parse(story.additionalInfo)
    };
  });

  return { allStories, count: response["@odata.count"] };
});

export const updateEndPublicationDateThunk = createAsyncThunk("story/updateEndPublicationDate", async (storyData: IStory, { dispatch }) => {
  try {
    validationPublishDate(storyData.beginningPublication, storyData.endPublication, "endPublish");
    if (storyData.endPublication) {
      await updateEndPublicationDate(storyData.id, storyData.endPublication);
      message.success(i18next.t("success.update.story.publishDate"));
    }
  } catch (err: any) {
    message.error(err.message);
  }
});

export const updateBeginningPublicationDateThunk = createAsyncThunk(
  "story/updateBeginningPublicationDate",
  async (storyData: IStory, { dispatch }) => {
    try {
      validationPublishDate(storyData.beginningPublication, storyData.endPublication, "startPublish");
      if (storyData.beginningPublication) {
        await updateBeginningPublicationDate(storyData.id, storyData.beginningPublication);
        message.success(i18next.t("success.update.story.publishDate"));
      }
    } catch (err: any) {
      message.error(err.message);
    }
  }
);

export const updateStatusStoryThunk = createAsyncThunk<void, { entity: IStory; status: string }>(
  "story/updateStatusStory",
  async ({ entity, status }) => {
    const updatedStory = await updateStatusContent(entity.id, status);
    message.success(i18next.t(`success.update.story.status${status}`));

    return updatedStory;
  }
);

export const updateSortOrderThunk = createAsyncThunk("story/updateSortOrder", async (orderData: IStorySortUpdate) => {
  await updateSortOrder(JSON.stringify(orderData));
  message.success(i18next.t("success.update.story.sortOrder"));
});

export const updateStoryThunk = createAsyncThunk("story/updateStory", async (storyUpdate: any) => {
  const body = JSON.stringify({
    ...storyUpdate,
    additionalInfo: JSON.stringify({
      ...storyUpdate.additionalInfo
    })
  });
  const res = await updateContent(storyUpdate.id, body);
  message.success(i18next.t("success.update.story.content"));
  const updatedStory = { ...res, additionalInfo: camelcaseKeys(JSON.parse(res.additionalInfo)) };

  return updatedStory;
});

export const addStoryThunk = createAsyncThunk("story/addStory", async (dataStory: IStory) => {
  const newStory = await addContent(
    JSON.stringify({
      ...dataStory,
      additionalInfo: JSON.stringify({
        ...dataStory.additionalInfo
      })
    })
  );
  message.success(i18next.t("success.create.story"));

  return newStory;
});

export const removeStoryThunk = createAsyncThunk("story/removeStory", async (entity: IStory) => {
  await deleteContent(entity.id);
  message.success(i18next.t("success.delete.story.content"));

  return;
});
