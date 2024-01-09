import { RegisterApiRequest } from "api/registerApiRequest";
import { errorPopup } from "common/helpers/toast/error";
import { successPopup } from "common/helpers/toast/success";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { RegisterListAction } from "./registerListAction";

export const RegisterListThunk = {
  getList(searchString: string): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterListAction.list.started(null));
      try {
        const response = await new RegisterApiRequest().getRegisterGroups(searchString);
        if (response.isError) {
          throw response;
        }
        const newList = response.result.filter((item) => item.registers.length > 0);
        dispatch(RegisterListAction.list.done({ params: null, result: newList }));
      } catch (error) {
        dispatch(RegisterListAction.list.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  deleteRegister(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const response = await new RegisterApiRequest().deleteRegister(id);
        if (response.isError) {
          throw response;
        }
        successPopup(response.result);
      } catch (error) {
        dispatch(RegisterListAction.list.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
};
