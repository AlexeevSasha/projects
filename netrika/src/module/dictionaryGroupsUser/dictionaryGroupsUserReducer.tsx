import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryGroupsUserAction } from "./dictionaryGroupsUserAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IBaseDictionary } from "../../common/interfaces/dictionary/IBaseDictionary";

export interface IState {
  data: IPaginateItems<IBaseDictionary[]>;
  loading: boolean;
}

export const InitialState: IState = {
  data: {} as IPaginateItems<IBaseDictionary[]>,
  loading: true,
};

export const dictionaryGroupsUserReducer = reducerWithInitialState(InitialState)
  .case(DictionaryGroupsUserAction.groupsList.started, (state) => ({
    data: state.data,
    loading: true,
  }))
  .case(DictionaryGroupsUserAction.groupsList.done, (state, payload) => ({
    data: payload.result,
    loading: false,
  }))
  .case(DictionaryGroupsUserAction.groupsList.failed, (state) => ({
    data: state.data,
    loading: false,
  }))

  .build();
