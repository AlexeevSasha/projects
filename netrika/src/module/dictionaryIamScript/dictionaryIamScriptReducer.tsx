import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryIamScriptAction } from "./dictionaryIamScriptAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IamScriptDto } from "../../common/interfaces/IamScriptDto";
import { IConfiguratorValue } from "../../common/interfaces/IConfiguratorValue";

export interface IState {
  iamScriptList: IPaginateItems<IamScriptDto[]>;
  loading: boolean;
  updatingLoading: boolean;
  paramTypes: IConfiguratorValue[];
  loadingParamTypes: boolean;
  loadingCountParams: boolean;
}

export const InitialState: IState = {
  iamScriptList: {} as IPaginateItems<IamScriptDto[]>,
  paramTypes: [],
  loadingParamTypes: false,
  loading: false,
  updatingLoading: false,
  loadingCountParams: false,
};

export const dictionaryIamScriptReducer = reducerWithInitialState(InitialState)
  .case(DictionaryIamScriptAction.loadCountParams.started, (state) => ({
    ...state,
    loadingCountParams: true,
  }))
  .case(DictionaryIamScriptAction.loadCountParams.done, (state) => ({
    ...state,
    loadingCountParams: false,
  }))
  .case(DictionaryIamScriptAction.loadCountParams.failed, (state) => ({
    ...state,
    loadingCountParams: false,
  }))
  .case(DictionaryIamScriptAction.paramTypes.started, (state) => ({
    ...state,
    loadingParamTypes: true,
  }))
  .case(DictionaryIamScriptAction.paramTypes.done, (state, payload) => ({
    ...state,
    paramTypes: payload.result,
    loadingParamTypes: false,
  }))
  .case(DictionaryIamScriptAction.paramTypes.failed, (state) => ({
    ...state,
    paramTypes: [],
    loadingParamTypes: false,
  }))
  .case(DictionaryIamScriptAction.iamScriptList.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(DictionaryIamScriptAction.iamScriptList.done, (state, payload) => ({
    ...state,
    iamScriptList: payload.result,
    loading: false,
  }))
  .case(DictionaryIamScriptAction.iamScriptList.failed, (state) => ({
    ...state,
    loading: false,
  }))
  .case(DictionaryIamScriptAction.updateScriptList.started, (state) => ({
    ...state,
    updatingLoading: true,
  }))
  .case(DictionaryIamScriptAction.updateScriptList.done, (state) => ({
    ...state,
    updatingLoading: false,
  }))
  .case(DictionaryIamScriptAction.updateScriptList.failed, (state) => ({
    ...state,
    updatingLoading: false,
  }))

  .build();
