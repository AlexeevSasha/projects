import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryBizObjectAction } from "./dictionaryBizObjectAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IRegisterBizObjDictionary } from "../../common/interfaces/register/IRegisterBizObjDictionary";

export interface IState {
  data: IPaginateItems<IRegisterBizObjDictionary[]>;
  loading: boolean;
}

export const InitialState: IState = {
  data: {} as IPaginateItems<IRegisterBizObjDictionary[]>,
  loading: true,
};

export const dictionaryBizObjectReducer = reducerWithInitialState(InitialState)
  .case(DictionaryBizObjectAction.dictionaryBizObject.started, (state) => ({
    data: state.data,
    loading: true,
  }))
  .case(DictionaryBizObjectAction.dictionaryBizObject.done, (state, payload) => ({
    data: payload.result,
    loading: false,
  }))
  .case(DictionaryBizObjectAction.dictionaryBizObject.failed, (state) => ({
    data: state.data,
    loading: false,
  }))

  .build();
