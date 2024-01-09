import { actionCreator } from "../../store/action/actionCreator";

export class RegisterCheckListSessionAction {
  static setIdToSession = actionCreator<{ id: number; jobId: string }>("Register/ControlList_FAKE_SESSION/SET_ID");
  static deleteIdToSession = actionCreator<number[]>("Register/ControlList_FAKE_SESSION/DELETE_ID");

  static setSessionToken = actionCreator<string>("Register/ControlList_FAKE_SESSION/SET_SESSION_TOKEN");
}
