import { reducerWithInitialState } from "typescript-fsa-reducers";
import { ProposalCriterionAction } from "./proposalCriterionAction";
import { IOrderInclusionCriteria } from "../../common/interfaces/order/IOrderInclusionCriteria";
import { IControllerResponse } from "../../common/interfaces/response/IControllerResponse";
import { ITestControlList } from "../../common/interfaces/ITestControlList";

export interface IState {
  criterionText: IOrderInclusionCriteria;
  loading: boolean;
  loadingTest: boolean;
  test: IControllerResponse<ITestControlList>;
}

export const InitialState: IState = {
  criterionText: {} as IOrderInclusionCriteria,
  loading: true,
  test: {} as IControllerResponse<ITestControlList>,
  loadingTest: false,
};

const {
  text,
  updateCriterionText,
  saveCriterions,
  autoCreateRegister,
  updateRegister,
  testCriterion,
  clearTestCriterion,
} = ProposalCriterionAction;

export const proposalCriterionReducer = reducerWithInitialState(InitialState)
  .case(text.started, (state) => ({ ...state, loading: true }))
  .case(text.failed, (state) => ({ ...state, loading: false }))
  .case(text.done, (state, { result }) => ({
    ...state,
    criterionText: result,
    loading: false,
  }))

  .case(updateCriterionText.started, (state) => ({ ...state, loading: true }))
  .case(updateCriterionText.failed, (state) => ({ ...state, loading: false }))
  .case(updateCriterionText.done, (state, { params }) => ({
    ...state,
    criterionText: params,
    loading: false,
  }))

  .cases([saveCriterions.started, autoCreateRegister.started, updateRegister.started], (state) => ({
    ...state,
    loading: true,
  }))
  .cases([saveCriterions.failed, autoCreateRegister.failed, updateRegister.failed], (state) => ({
    ...state,
    loading: false,
  }))
  .cases([saveCriterions.done, autoCreateRegister.done, updateRegister.done], (state) => ({ ...state, loading: false }))

  .cases([testCriterion.started], (state) => ({
    ...state,
    loadingTest: true,
  }))
  .cases([testCriterion.failed], (state) => ({
    ...state,
    loadingTest: false,
  }))
  .cases([testCriterion.done], (state, { result }) => ({ ...state, test: result, loadingTest: false }))

  .cases([clearTestCriterion], (state) => ({
    ...state,
    test: { message: "", isError: true } as IControllerResponse<ITestControlList>,
    loadingTest: false,
  }))

  .build();
