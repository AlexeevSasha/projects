import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IMedicalCareCaseCardGetSteps } from "../../common/interfaces/medical/IMedicalCareCaseCardGetSteps";
import { DiseaseMedicalCareCaseCardAction } from "./diseaseMedicalCareCaseCardAction";

export interface IState {
  steps: IMedicalCareCaseCardGetSteps[];
  loadingSteps: boolean;
}

export const InitialState: IState = {
  steps: [] as IMedicalCareCaseCardGetSteps[],
  loadingSteps: true,
};

export const diseaseMedicalCareCaseCardReducer = reducerWithInitialState(InitialState)
  .case(DiseaseMedicalCareCaseCardAction.Steps.started, (state) => ({
    ...state,
    loadingSteps: true,
  }))
  .case(DiseaseMedicalCareCaseCardAction.Steps.done, (state, { result }) => ({
    ...state,
    steps: result,
    loadingSteps: false,
  }))
  .case(DiseaseMedicalCareCaseCardAction.Steps.failed, (state, { error }) => ({
    ...state,
    steps: [] as IMedicalCareCaseCardGetSteps[],
    loadingSteps: false,
    error,
  }))

  .build();
