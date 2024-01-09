import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DictionaryCriterionAction } from "./dictionaryQualityCriterionQueryAction";
import { IPaginateItems } from "../../common/interfaces/dictionary/IDictionaryDisplayField";
import { IQualityCriterionQueryDictionary } from "../../common/interfaces/quality/IQualityCriterionQueryDictionary";

export interface IState {
  data: IPaginateItems<IQualityCriterionQueryDictionary[]>;
  loading: boolean;
}

export const initialState: IState = {
  data: {} as IPaginateItems<IQualityCriterionQueryDictionary[]>,
  loading: false,
};

const { getCriterions, deleteCriterion, createCriterion, updateCriterion } = DictionaryCriterionAction;

export const dictionaryQualityCriterionQueryReducer = reducerWithInitialState(initialState)
  .case(getCriterions.started, (state) => ({ ...state, data: initialState.data, loading: true }))
  .case(getCriterions.done, (state, { result }) => ({ ...state, data: result, loading: false }))
  .case(getCriterions.failed, (state) => ({ ...state, ...state, loading: false }))

  .case(createCriterion.started, (state) => ({ ...state, loading: true }))
  .case(createCriterion.failed, (state) => ({ ...state, loading: false }))

  .case(updateCriterion.started, (state) => ({ ...state, loading: true }))
  .case(updateCriterion.failed, (state) => ({ ...state, loading: false }))

  .case(deleteCriterion.started, (state) => ({ ...state, loading: true }))
  .case(deleteCriterion.failed, (state) => ({ ...state, loading: false }))

  .build();
