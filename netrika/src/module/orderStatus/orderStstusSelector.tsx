import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const orderStatusSelector = createSelector(
  (state: IAppState) => state.orderStatus,
  ({ status }) => status
);

export const enableNsiOptionSelector = createSelector(
  (state: IAppState) => state.orderStatus,
  ({ enableNsiOption }) => enableNsiOption
);
