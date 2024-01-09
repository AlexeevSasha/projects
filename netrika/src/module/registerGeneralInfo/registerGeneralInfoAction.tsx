import { actionCreator } from "../../store/action/actionCreator";
import { IRegisterAttachment } from "../../common/interfaces/register/IRegisterAttachment";
import { IRegister } from "../../common/interfaces/register/IRegister";
import { IDownloadXls } from "module/registerCheckList/registerCheckListReducer";

export class RegisterGeneralInfoAction {
  static infoRegister = actionCreator.async<null, IRegister, Error>("Register/GeneralInfo_INFO_REGISTER");
  static infoDoc = actionCreator.async<null, IRegisterAttachment[], Error>("Register/GeneralInfo_INFO_DOC");

  static getFile = actionCreator.async<null, IDownloadXls, Error>("Register/GET_FILE_TO_LOAD");
}
