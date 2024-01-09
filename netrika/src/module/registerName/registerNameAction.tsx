import { actionCreator } from "../../store/action/actionCreator";

export class RegisterNameAction {
  static registerName = actionCreator.async<null, string, Error>("Register/NAME");
}
