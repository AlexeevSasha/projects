import { StateType } from "../../../core/redux/store";
import { bannerAdapter } from "./bannerSlice";

const bannerAllSelector = bannerAdapter.getSelectors((state: StateType) => state.banner);

export const getBannerEntities = bannerAllSelector.selectAll;
