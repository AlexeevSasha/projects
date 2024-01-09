import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

const state = ({ registerCheckListSession }: IAppState) => registerCheckListSession;

export const checkListSessionSelector = createSelector(state, ({ sessionIdList }) => sessionIdList);
