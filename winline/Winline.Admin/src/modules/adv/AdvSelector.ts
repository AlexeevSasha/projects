import { advAdapter } from "./advSlice";
import type { StateType } from "../../core/redux/store";

const bannersSelector = advAdapter.getSelectors((state: StateType) => state.adv);

export const bannersSelectorEntities = bannersSelector.selectAll;
