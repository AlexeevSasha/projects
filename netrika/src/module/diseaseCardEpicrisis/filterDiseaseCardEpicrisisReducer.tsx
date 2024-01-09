import { IObservation } from "common/interfaces/IObservation";
import { Moment } from "moment";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { DiseaseCardEpicrisisAction } from "./diseaseCardEpicrisisAction";

interface IFilter {
  dateType: string;
  date?: Moment;
  orgs: (IObservation & { isSelect: boolean })[];
}
export interface IState {
  filter: IFilter;
}

export const InitialState: IState = {
  filter: {
    dateType: "",
    orgs: [],
  },
};

export const filterDiseaseCardEpicrisisReducer = reducerWithInitialState(InitialState)
  .case(DiseaseCardEpicrisisAction.setDateFilter, (state, params) => ({
    ...state,
    filter: { ...state.filter, ...params },
  }))
  .case(DiseaseCardEpicrisisAction.setOrgsFilter, (state, params) => ({
    ...state,
    filter: { ...state.filter, orgs: params },
  }))
  .case(DiseaseCardEpicrisisAction.resetFilter, (state) => ({
    ...state,
    filter: { dateType: "", orgs: [] },
  }))

  .build();
