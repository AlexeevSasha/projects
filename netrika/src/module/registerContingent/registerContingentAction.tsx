import { actionCreator } from "../../store/action/actionCreator";

export class RegisterContingentAction {
  static newList = actionCreator.async<null, [{ authUrl: string }], Error>("Register/RegisterContingent_IAM_INFO");
  static list = actionCreator.async<null, string[], Error>("Register/RegisterContingent_INFO");
}
