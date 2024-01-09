import { IAppState } from "../../store/mainReducer";
import { createSelector } from "reselect";

const state = ({ registerPlatform }: IAppState) => registerPlatform;

export const registerPlatformSelector = createSelector(state, ({ loading, manual, manualFile }) => ({
  loading,
  manual,
  manualFile,
}));
