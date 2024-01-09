import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { ConfigurationAction } from "./сonfigurationAction";
import { ConfigurationApiRequest } from "../../api/configurationApiRequest";
import { errorPopup } from "../../common/helpers/toast/error";

export const ConfigurationThunk = {
  getCheckControlEventsOption(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ConfigurationAction.getCheckControlEventsOptionAction.started(null));
      try {
        const result = await new ConfigurationApiRequest().getCheckControlEventsOption();
        if (result.isError) {
          throw result;
        }
        dispatch(ConfigurationAction.getCheckControlEventsOptionAction.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(ConfigurationAction.getCheckControlEventsOptionAction.failed({ params: null, error }));
      }
    };
  },
  getShowUserPasswordOption(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ConfigurationAction.getShowUserPasswordOptionAction.started(null));
      try {
        const result = await new ConfigurationApiRequest().getShowUserPasswordOption();
        if (result.isError) {
          throw result;
        }
        dispatch(ConfigurationAction.getShowUserPasswordOptionAction.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(ConfigurationAction.getShowUserPasswordOptionAction.failed({ params: null, error }));
      }
    };
  },
  getContingentOption(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ConfigurationAction.getContingentOptionAction.started(null));
      try {
        const result = await new ConfigurationApiRequest().getContingentOption();
        if (result.isError) {
          throw result;
        }
        dispatch(ConfigurationAction.getContingentOptionAction.done({ params: null, result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(ConfigurationAction.getContingentOptionAction.failed({ params: null, error }));
      }
    };
  },
};
