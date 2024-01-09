import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryConfBlockAction } from "./dictionaryConfBlockAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IConfBlockDictionary } from "../../common/interfaces/dictionary/IConfBlockDictionary";

export interface IState {
  data: IPaginateItems<IConfBlockDictionary[]>;
  loading: boolean;
}

export const InitialState: IState = {
  data: {} as IPaginateItems<IConfBlockDictionary[]>,
  loading: true,
};

export const dictionaryConfBlockReducer = reducerWithInitialState(InitialState)
  .case(DictionaryConfBlockAction.dictionaryConfBlock.started, (state) => ({
    data: state.data,
    loading: true,
  }))
  .case(DictionaryConfBlockAction.dictionaryConfBlock.done, (state, payload) => ({
    data: payload.result,
    loading: false,
  }))
  .case(DictionaryConfBlockAction.dictionaryConfBlock.failed, (state) => ({
    data: state.data,
    loading: false,
  }))

  .build();
