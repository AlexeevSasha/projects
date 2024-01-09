import { actionCreator } from "../../store/action/actionCreator";
import { IManual } from "../../common/interfaces/IManual";

export class RegisterPlatformAction {
  static manual = actionCreator.async<void, IManual, Error>("Register/Platform/Manual");
  static manualFile = actionCreator.async<void, Blob, Error>("Register/Platform/ManualFile");
  static uploadFile = actionCreator.async<void, string, Error>("Register/Platform/UploadFile");
}
