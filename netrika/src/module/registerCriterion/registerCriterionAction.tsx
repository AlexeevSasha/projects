import { actionCreator } from "../../store/action/actionCreator";
import { IOrderInclusionCriteria } from "../../common/interfaces/order/IOrderInclusionCriteria";

export class RegisterCriterionAction {
  static text = actionCreator.async<null, IOrderInclusionCriteria, Error>("Register/RegisterCriterion_INFO");
}
