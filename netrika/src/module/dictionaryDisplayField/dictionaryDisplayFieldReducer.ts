import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryDisplayFieldAction } from "./dictionaryDisplayFieldAction";
import { IDisplayFieldItem, IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IDictionaryDisplayTableField } from "../../common/interfaces/dictionary/IDictionaryDisplayTableField";
import { IConfiguratorValue } from "../../common/interfaces/IConfiguratorValue";

export interface IState {
  displayFieldList: IPaginateItems<IDisplayFieldItem[]>;
  loading: boolean;

  bizObjectsList: { id: number; name: string }[];
  bizObjectsListLoading: boolean;

  attributesList: { id: number; name: string; description: string }[];
  attributesListLoading: boolean;

  dictionariesList: IConfiguratorValue[];
  dictionariesLoading: boolean;

  tableFieldList: IDictionaryDisplayTableField[];
  tableFieldListLoading: boolean;
}

export const InitialState: IState = {
  displayFieldList: {} as IPaginateItems<IDisplayFieldItem[]>,
  loading: true,

  bizObjectsList: [] as { id: number; name: string }[],
  bizObjectsListLoading: false,

  attributesList: [] as { id: number; name: string; description: string }[],
  attributesListLoading: false,

  dictionariesList: [],
  dictionariesLoading: false,
  tableFieldList: [] as IDictionaryDisplayTableField[],
  tableFieldListLoading: false,
};

export const dictionaryDisplayFieldReducer = reducerWithInitialState(InitialState)
  .case(DictionaryDisplayFieldAction.displayFieldList.started, (state) => ({
    ...state,
    displayFieldList: state.displayFieldList,
    loading: true,
  }))
  .case(DictionaryDisplayFieldAction.displayFieldList.done, (state, payload) => ({
    ...state,
    displayFieldList: payload.result,
    loading: false,
  }))
  .case(DictionaryDisplayFieldAction.displayFieldList.failed, (state) => ({
    ...state,
    displayFieldList: state.displayFieldList,
    loading: false,
  }))
  .case(DictionaryDisplayFieldAction.bizObjectsList.started, (state) => ({
    ...state,
    bizObjectsList: state.bizObjectsList,
    bizObjectsListLoading: true,
  }))
  .case(DictionaryDisplayFieldAction.bizObjectsList.done, (state, payload) => ({
    ...state,
    bizObjectsList: payload.result,
    bizObjectsListLoading: false,
  }))
  .case(DictionaryDisplayFieldAction.bizObjectsList.failed, (state) => ({
    ...state,
    bizObjectsList: state.bizObjectsList,
    bizObjectsListLoading: false,
  }))
  .case(DictionaryDisplayFieldAction.attributesList.started, (state) => ({
    ...state,
    attributesList: state.attributesList,
    attributesListLoading: true,
  }))
  .case(DictionaryDisplayFieldAction.attributesList.done, (state, payload) => ({
    ...state,
    attributesList: payload.result,
    attributesListLoading: false,
  }))
  .case(DictionaryDisplayFieldAction.attributesList.failed, (state) => ({
    ...state,
    attributesList: state.attributesList,
    attributesListLoading: false,
  }))
  .case(DictionaryDisplayFieldAction.dictionariesList.started, (state) => ({
    ...state,
    dictionariesList: state.dictionariesList,
    dictionariesLoading: true,
  }))
  .case(DictionaryDisplayFieldAction.dictionariesList.done, (state, payload) => ({
    ...state,
    dictionariesList: payload.result,
    dictionariesLoading: false,
  }))
  .case(DictionaryDisplayFieldAction.dictionariesList.failed, (state) => ({
    ...state,
    dictionariesList: state.dictionariesList,
    dictionariesLoading: false,
  }))
  .case(DictionaryDisplayFieldAction.tableFields.started, (state) => ({
    ...state,
    tableFieldList: state.tableFieldList,
    tableFieldListLoading: true,
  }))
  .case(DictionaryDisplayFieldAction.tableFields.done, (state, payload) => ({
    ...state,
    tableFieldList: payload.result,
    tableFieldListLoading: false,
  }))
  .case(DictionaryDisplayFieldAction.tableFields.failed, (state) => ({
    ...state,
    tableFieldList: state.tableFieldList,
    tableFieldListLoading: false,
  }))
  .case(DictionaryDisplayFieldAction.clearLists.done, (state, payload) => ({
    ...state,
    dictionariesList: payload.params.isDictionariesList ? InitialState.dictionariesList : state.dictionariesList,
    attributesList: payload.params.isAttributesList ? InitialState.attributesList : state.attributesList,
    tableFieldList: payload.params.isTableFieldList ? InitialState.tableFieldList : state.tableFieldList,
  }))
  .build();
