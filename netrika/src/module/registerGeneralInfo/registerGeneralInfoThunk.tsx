import { RegisterApiRequest } from "api/registerApiRequest";
import { RegisterAttachmentApiRequest } from "api/registerAttachmentApiRequest";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { RegisterNameAction } from "../registerName/registerNameAction";
import { RegisterGeneralInfoAction } from "./registerGeneralInfoAction";

export const RegisterGeneralInfoThunk = {
  getRegister(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterGeneralInfoAction.infoRegister.started(null));
      try {
        const result = await new RegisterApiRequest().getRegister(id);
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterGeneralInfoAction.infoRegister.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(RegisterGeneralInfoAction.infoRegister.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  setInfoRegister(id: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState): Promise<void> => {
      const info = getState().registerGeneralInfo.dataRegister;

      dispatch(RegisterGeneralInfoAction.infoRegister.started(null));
      try {
        const result = await new RegisterApiRequest().updateRegisterStatusIsArchive(id);
        if (result.isError) {
          throw result;
        }
        dispatch(
          RegisterGeneralInfoAction.infoRegister.done({
            params: null,
            result: {
              ...info,
              ...result.result,
              isArchive: !info.isArchive,
            },
          })
        );
        successPopup(result.message || "Статус регистра изменён.");
      } catch (error) {
        dispatch(RegisterGeneralInfoAction.infoRegister.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getDoc(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterGeneralInfoAction.infoDoc.started(null));
      try {
        const result = await new RegisterAttachmentApiRequest().getRegisterAttachments(id);
        if (result.isError) {
          throw result;
        }
        dispatch(
          RegisterGeneralInfoAction.infoDoc.done({
            params: null,
            result: result.result,
          })
        );
      } catch (error) {
        dispatch(RegisterGeneralInfoAction.infoDoc.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  downloadFile(id: number, name?: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        dispatch(RegisterGeneralInfoAction.getFile.started(null));
        const result = await new RegisterAttachmentApiRequest().downloadRegisterAttachment(id);
        if (result?.isError) {
          throw result;
        }
        dispatch(
          RegisterGeneralInfoAction.getFile.done({
            params: null,
            result: { isFile: true, file: result, name },
          })
        );
      } catch (error) {
        dispatch(RegisterGeneralInfoAction.getFile.failed(error));
        errorPopup(error.message);
      }
    };
  },

  getRegisterName(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterNameAction.registerName.started(null));
      try {
        const result = await new RegisterApiRequest().getRegisterName(id);
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterNameAction.registerName.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(RegisterNameAction.registerName.failed(error));
        errorPopup(error.message);
      }
    };
  },

  sendRegisterToUpdate(params: number): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new RegisterApiRequest().sendRegisterToUpdate(params);
        if (result.isError) {
          throw result;
        }
        successPopup("Запущен процесс обновления регистра.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
