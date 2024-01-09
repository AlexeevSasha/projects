import { createSelector } from "reselect";
import { IAppState } from "../../store/mainReducer";

export const proposalCheckListSelector = createSelector(
  (state: IAppState) => state.proposalCheckList.controlCheckList,
  (state: IAppState) => state.proposalCheckList.loading,
  (state: IAppState) => state.proposalCheckList.setting,
  (state: IAppState) => state.proposalCheckList.disabledSave,
  (controlCheckList, loading, setting, disabledSave) => ({ controlCheckList, loading, setting, disabledSave })
);
