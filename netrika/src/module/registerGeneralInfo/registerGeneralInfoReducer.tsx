import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RegisterGeneralInfoAction } from "./registerGeneralInfoAction";
import { IRegisterAttachment } from "../../common/interfaces/register/IRegisterAttachment";
import { IRegister } from "../../common/interfaces/register/IRegister";
import { IDownloadXls } from "module/registerCheckList/registerCheckListReducer";

export interface IState {
  dataRegister: IRegister;
  dataDoc: IRegisterAttachment[];
  loadingRegister: boolean;
  loadingDoc: boolean;
  updateStatus: number;
  downloadFile: IDownloadXls;
  loadingFile: boolean;
}

export const InitialState: IState = {
  dataRegister: {} as IRegister,
  dataDoc: [],
  loadingRegister: true,
  loadingDoc: true,
  updateStatus: 0,
  downloadFile: { isFile: false, file: undefined },
  loadingFile: false,
};

export const registerGeneralInfoReducer = reducerWithInitialState(InitialState)
  .case(RegisterGeneralInfoAction.infoRegister.started, (state) => ({
    ...state,
    loadingRegister: true,
  }))
  .case(RegisterGeneralInfoAction.infoRegister.done, (state, payload) => ({
    ...state,
    dataRegister: payload.result,
    loadingRegister: false,
  }))
  .case(RegisterGeneralInfoAction.infoRegister.failed, (state) => ({
    ...state,
    loadingRegister: false,
  }))

  .case(RegisterGeneralInfoAction.infoDoc.started, (state) => ({
    ...state,
    loadingDoc: true,
  }))
  .case(RegisterGeneralInfoAction.infoDoc.done, (state, payload) => ({
    ...state,
    dataDoc: payload.result,
    loadingDoc: true,
  }))
  .case(RegisterGeneralInfoAction.infoDoc.failed, (state) => ({
    ...state,
    loadingDoc: false,
  }))

  .case(RegisterGeneralInfoAction.getFile.started, (state) => ({
    ...state,
    loadingFile: true,
  }))
  .case(RegisterGeneralInfoAction.getFile.done, (state, payload) => ({
    ...state,
    downloadFile: payload.result,
    loadingFile: false,
  }))
  .case(RegisterGeneralInfoAction.getFile.failed, (state) => ({
    ...state,
    loadingFile: false,
  }))

  .build();
