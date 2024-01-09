import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RegisterCheckListFilterFieldsAction } from "./registerCheckListFilterFieldsAction";
import {
  IRegisterFilterFields,
  IRegisterFilterFieldsFilterGroup,
} from "../../common/interfaces/register/IRegisterFilterFields";

export interface IState {
  filterFields: IRegisterFilterFields;
  defaultFilterFields: IRegisterFilterFieldsFilterGroup[];

  loadingFilterFields: boolean;
  loadingDefaultFilterFields: boolean;
  errorMessage: string;
  loadingScreen: boolean;
}

export const InitialState: IState = {
  filterFields: {} as IRegisterFilterFields,
  defaultFilterFields: [],
  loadingDefaultFilterFields: false,
  loadingFilterFields: false,
  errorMessage: "",
  loadingScreen: false,
};
export const registerCheckListFilterFieldsReducer = reducerWithInitialState(InitialState)
  .case(RegisterCheckListFilterFieldsAction.filterInfo.started, (state) => ({
    ...state,
    errorMessage: "",
    loadingFilterFields: true,
  }))
  .case(RegisterCheckListFilterFieldsAction.filterInfo.done, (state, payload) => ({
    ...state,
    filterFields: payload.result,
    loadingFilterFields: false,
  }))
  .case(RegisterCheckListFilterFieldsAction.filterInfo.failed, (state) => ({
    ...state,
    loadingFilterFields: false,
  }))
  .case(RegisterCheckListFilterFieldsAction.defaultFilterInfo.started, (state) => ({
    ...state,
    errorMessage: "",
    loadingDefaultFilterFields: true,
  }))
  .case(RegisterCheckListFilterFieldsAction.defaultFilterInfo.done, (state, payload) => ({
    ...state,
    errorMessage: payload.result.message || "",
    defaultFilterFields: payload.result.filterGroup,
    loadingDefaultFilterFields: false,
  }))
  .case(RegisterCheckListFilterFieldsAction.defaultFilterInfo.failed, (state) => ({
    ...state,
    loadingDefaultFilterFields: false,
  }))
  .case(RegisterCheckListFilterFieldsAction.updateFilterInfo.started, (state) => ({
    ...state,
    errorMessage: "",
    loadingScreen: true,
  }))
  .case(RegisterCheckListFilterFieldsAction.updateFilterInfo.done, (state) => ({
    ...state,
    loadingScreen: false,
  }))
  .case(RegisterCheckListFilterFieldsAction.updateFilterInfo.failed, (state, payload) => ({
    ...state,
    loadingScreen: false,
    loadingFilterFields: false,
    errorMessage: payload.error,
  }))

  .build();
