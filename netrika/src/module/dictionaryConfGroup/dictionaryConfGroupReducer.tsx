import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryConfGroupAction } from "./dictionaryConfGroupAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IConfGroupDictionary } from "../../common/interfaces/dictionary/IConfGroupDictionary";

export interface IState {
  data: IPaginateItems<IConfGroupDictionary[]>;
  loading: boolean;
}

export const InitialState: IState = {
  data: {} as IPaginateItems<IConfGroupDictionary[]>,
  loading: true,
};

export const dictionaryConfGroupReducer = reducerWithInitialState(InitialState)
  .case(DictionaryConfGroupAction.dictionaryConfGroup.started, (state) => ({
    data: state.data,
    loading: true,
  }))
  .case(DictionaryConfGroupAction.dictionaryConfGroup.done, (state, payload) => ({
    data: payload.result,
    loading: false,
  }))
  .case(DictionaryConfGroupAction.dictionaryConfGroup.failed, (state) => ({
    data: state.data,
    loading: false,
  }))

  .build();
