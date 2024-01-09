import { actionCreator } from "../../store/action/actionCreator";
import { IOrderInclusionCriteria } from "../../common/interfaces/order/IOrderInclusionCriteria";
import { IControllerResponse } from "common/interfaces/response/IControllerResponse";
import { ITestControlList } from "../../common/interfaces/ITestControlList";

export class ProposalCriterionAction {
  static text = actionCreator.async<null, IOrderInclusionCriteria, Error>("Register/ProposalCriterion_INFO");
  static updateCriterionText = actionCreator.async<IOrderInclusionCriteria, void, Error>("UPDATE_CRITERION_TEXT");
  static testCriterion = actionCreator.async<void, IControllerResponse<ITestControlList>, Error>(
    "Proposal/TestCriterion"
  );
  static clearTestCriterion = actionCreator("Proposal/ClearTestCriterion");
  static autoCreateRegister = actionCreator.async<number, void, Error>("AUTO_CREATE_REGISTER");
  static updateRegister = actionCreator.async<number, void, Error>("UPDATE_REGISTER");
  static saveCriterions = actionCreator.async<number, void, Error>("SAVE_CRITERIONS");
}
