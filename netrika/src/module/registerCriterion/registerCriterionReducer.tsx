import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RegisterCriterionAction } from "./registerCriterionAction";
import { IOrderInclusionCriteria } from "../../common/interfaces/order/IOrderInclusionCriteria";

export interface IState {
  criterionText: IOrderInclusionCriteria;
  loading: boolean;
}

export const InitialState: IState = {
  criterionText: {} as IOrderInclusionCriteria,
  loading: true,
};

export const registerCriterionReducer = reducerWithInitialState(InitialState)
  .case(RegisterCriterionAction.text.started, (state) => ({
    criterionText: state.criterionText,
    loading: true,
  }))
  .case(RegisterCriterionAction.text.done, (state, payload) => ({
    criterionText: payload.result,
    loading: false,
  }))
  .case(RegisterCriterionAction.text.failed, (state) => ({
    criterionText: state.criterionText,
    loading: false,
  }))

  .build();
