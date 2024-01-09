import { RegisterContingentApiRequest } from "api/registerContingentApiRequest";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { RegisterContingentAction } from "./registerContingentAction";

export const RegisterContingentThunk = {
  getList(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterContingentAction.list.started(null));
      try {
        const result = await new RegisterContingentApiRequest().getRegisterContingentLinks(id);
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterContingentAction.list.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(RegisterContingentAction.list.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getNewList(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterContingentAction.list.started(null));
      try {
        const result = await new RegisterContingentApiRequest().getRegisterContingentIamLinks(id);
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterContingentAction.newList.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(RegisterContingentAction.newList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
};
