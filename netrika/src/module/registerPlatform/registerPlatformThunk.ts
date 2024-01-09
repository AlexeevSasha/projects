import { errorPopup } from "common/helpers/toast/error";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { RegisterPlatformAction } from "./registerPlatformAction";
import { RegistryPlatformRequest } from "../../api/registryPlatformRequest";
import { successPopup } from "../../common/helpers/toast/success";

export const RegisterPlatformThunk = {
  getManual(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterPlatformAction.manual.started());
      try {
        const result = await new RegistryPlatformRequest().getManual();
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterPlatformAction.manual.done({ result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterPlatformAction.manual.failed({ error }));
      }
    };
  },
  downloadFile(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterPlatformAction.manualFile.started());
      try {
        const result = await new RegistryPlatformRequest().downloadManual();
        dispatch(RegisterPlatformAction.manualFile.done({ result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterPlatformAction.manualFile.failed({ error }));
      }
    };
  },
  uploadFile(file: File, callback?: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterPlatformAction.uploadFile.started());
      try {
        const result = await new RegistryPlatformRequest().updateManualFile(file);
        dispatch(RegisterPlatformAction.uploadFile.done({ result: result?.result }));
        successPopup("Файл успешно добавлен");
        callback?.();
      } catch (error) {
        errorPopup(error.message);
        dispatch(RegisterPlatformAction.uploadFile.failed({ error }));
      }
    };
  },
};
