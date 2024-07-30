import { StateType } from "../../../../core/redux/store";
import { imageInfoPageAdapter } from "./imageInfoPageSlice";

const imageInfoPageAllSelect = imageInfoPageAdapter.getSelectors((state: StateType) => state.imageInfoPage);

export const getImageInfoPageEntities = imageInfoPageAllSelect.selectAll;
