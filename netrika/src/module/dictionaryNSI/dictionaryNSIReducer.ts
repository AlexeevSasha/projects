import { INsiDictionary } from "common/interfaces/INsiDictionary";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryNSIAction } from "./dictionaryNSIAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";

export interface IState {
  list: IPaginateItems<INsiDictionary[]>;
  loading: boolean;
  lastLoadList?: string;
  sessionIdList: { id: string; jobId: string }[];
  sessionToken: string;
  activeList: string;
}

export const InitialState: IState = {
  list: {} as IPaginateItems<INsiDictionary[]>,
  loading: true,
  lastLoadList: undefined,
  sessionIdList: [],
  sessionToken: "",
  activeList: "",
};

export const dictionaryNSIReducer = reducerWithInitialState(InitialState)
  .case(DictionaryNSIAction.dictionaryNSIList.started, (state) => ({
    ...state,
    list: state.list,
    loading: true,
  }))
  .case(DictionaryNSIAction.dictionaryNSIList.done, (state, payload) => ({
    ...state,

    list: payload.result,
    loading: false,
  }))
  .case(DictionaryNSIAction.dictionaryNSIList.failed, (state) => ({
    ...state,
    list: {} as IPaginateItems<INsiDictionary[]>,
    loading: false,
  }))
  .case(DictionaryNSIAction.updateActiveList, (state, payload) => ({
    ...state,
    activeList: payload,
  }))
  .case(DictionaryNSIAction.setIdToSession, (state, payload) => ({
    ...state,
    sessionIdList: [...state.sessionIdList, payload],
  }))

  .case(DictionaryNSIAction.deleteIdToSession, (state, payload) => ({
    ...state,
    sessionIdList: [...state.sessionIdList.filter((sessionId) => !payload.find((item) => item === sessionId.id))],
  }))

  .case(DictionaryNSIAction.setSessionToken, (state, payload) => ({
    ...state,
    sessionToken: payload,
  }))
  .case(DictionaryNSIAction.updateLastLoadList, (state, payload) => ({
    ...state,
    lastLoadList: payload,
  }))

  .build();
