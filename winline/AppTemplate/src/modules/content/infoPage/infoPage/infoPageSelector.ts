import { StateType } from "../../../../core/redux/store";
import { infoPageAdapter } from "./infoPageSlice";

const infoPageAllSelect = infoPageAdapter.getSelectors((state: StateType) => state.infoPage);

export const getInfoPageEntities = infoPageAllSelect.selectAll;
