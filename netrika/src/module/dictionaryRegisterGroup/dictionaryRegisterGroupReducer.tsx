import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryRegisterGroupAction } from "./dictionaryRegisterGroupAction";
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

export const dictionaryRegisterGroupReducer = reducerWithInitialState(InitialState)
  .case(DictionaryRegisterGroupAction.dictionaryRegisterGroup.started, (state) => ({
    data: state.data,
    loading: true,
  }))
  .case(DictionaryRegisterGroupAction.dictionaryRegisterGroup.done, (state, payload) => ({
    data: payload.result,
    loading: false,
  }))
  .case(DictionaryRegisterGroupAction.dictionaryRegisterGroup.failed, (state) => ({
    data: state.data,
    loading: false,
  }))

  .build();
