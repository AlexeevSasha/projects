import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryLogAction } from "./dictionaryLogAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IDictionaryLogItem } from "../../common/interfaces/dictionary/IDictionaryLogItem";

export interface IState {
  dictionaryLogList: IPaginateItems<IDictionaryLogItem[]>;
  loading: boolean;
}

export const InitialState: IState = {
  dictionaryLogList: {} as IPaginateItems<IDictionaryLogItem[]>,
  loading: true,
};

export const dictionaryLogReducer = reducerWithInitialState(InitialState)
  .case(DictionaryLogAction.LogList.started, (state) => ({
    dictionaryLogList: state.dictionaryLogList,
    loading: true,
  }))
  .case(DictionaryLogAction.LogList.done, (state, payload) => {
    return {
      dictionaryLogList: payload.result,
      loading: false,
    };
  })
  .case(DictionaryLogAction.LogList.failed, (state) => ({
    dictionaryLogList: state.dictionaryLogList,
    loading: false,
  }))

  .build();
