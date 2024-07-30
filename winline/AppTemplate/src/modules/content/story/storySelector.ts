import { StateType } from "../../../core/redux/store";
import { storyAdapter } from "./storySlice";

const storyAllSelector = storyAdapter.getSelectors((state: StateType) => state.story);

export const getStoryEntities = storyAllSelector.selectAll;
