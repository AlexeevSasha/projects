import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryFieldDefaultAction } from "./dictionaryFieldDefaultAction";
import { ICustomSelect } from "../../common/interfaces/ISelect";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IDefaultRegisterFieldDictionary } from "../../common/interfaces/IDefaultRegisterFieldDictionary";

export interface IState {
  data: IPaginateItems<IDefaultRegisterFieldDictionary[]>;
  loading: boolean;
  listName: ICustomSelect[];
  listBizObj: ICustomSelect[];
}

export const InitialState: IState = {
  data: {} as IPaginateItems<IDefaultRegisterFieldDictionary[]>,
  loading: true,
  listName: [] as ICustomSelect[],
  listBizObj: [] as ICustomSelect[],
};

export const dictionaryFieldDefaultReducer = reducerWithInitialState(InitialState)
  .case(DictionaryFieldDefaultAction.dictionaryFieldDefault.started, (state) => ({
    data: state.data,
    loading: true,
    listName: state.listName,
    listBizObj: state.listBizObj,
  }))
  .case(DictionaryFieldDefaultAction.dictionaryFieldDefault.done, (state, payload) => ({
    data: payload.result,
    loading: false,
    listName: state.listName,
    listBizObj: state.listBizObj,
  }))
  .case(DictionaryFieldDefaultAction.dictionaryFieldDefault.failed, (state) => ({
    data: state.data,
    loading: false,
    listName: state.listName,
    listBizObj: state.listBizObj,
  }))

  .case(DictionaryFieldDefaultAction.listFields.started, (state) => ({
    data: state.data,
    loading: state.loading,
    listName: state.listName,
    listBizObj: state.listBizObj,
  }))
  .case(DictionaryFieldDefaultAction.listFields.done, (state, payload) => ({
    data: state.data,
    loading: state.loading,
    listName: payload.result.map((item) => {
      return { value: item, label: item } as ICustomSelect;
    }),
    listBizObj: state.listBizObj,
  }))
  .case(DictionaryFieldDefaultAction.listFields.failed, (state) => ({
    data: state.data,
    loading: state.loading,
    listName: state.listName,
    listBizObj: state.listBizObj,
  }))

  .case(DictionaryFieldDefaultAction.listBizObj.started, (state) => ({
    data: state.data,
    loading: state.loading,
    listName: state.listName,
    listBizObj: state.listBizObj,
  }))
  .case(DictionaryFieldDefaultAction.listBizObj.done, (state, payload) => ({
    data: state.data,
    loading: state.loading,
    listName: state.listName,
    listBizObj: payload.result,
  }))
  .case(DictionaryFieldDefaultAction.listBizObj.failed, (state) => ({
    data: state.data,
    loading: state.loading,
    listName: state.listName,
    listBizObj: state.listBizObj,
  }))

  .build();
