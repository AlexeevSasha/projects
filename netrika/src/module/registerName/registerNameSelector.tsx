import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const registerNameSelector = createSelector(
  (state: IAppState) => state.registerName.registerName,
  (registerName) => ({ registerName })
);
