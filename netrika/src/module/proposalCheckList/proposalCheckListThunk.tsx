import { OrderControlListApiRequest } from "api/orderControlListApiRequest";
import { IAddOrderControlListRequest } from "../../common/interfaces/order/IAddOrderControlListRequest";
import { IOrderControlList } from "../../common/interfaces/order/IOrderControlList";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { ProposalCheckListAction } from "./proposalCheckListAction";
import { RegisterSettingsCheckListAction } from "../registerSettingsCheckList/registerSettingsCheckListAction";
import { FilterConstructorAction } from "../filter/filterConstructorAction";

export const ProposalCheckListThunk = {
  getList(id: number, page: number, size: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalCheckListAction.list.started(null));
      try {
        const result = await new OrderControlListApiRequest().getOrderControlLists(id, page, size);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalCheckListAction.list.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalCheckListAction.list.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  create(data: IAddOrderControlListRequest, callback: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalCheckListAction.createCheckList.started(null));
      try {
        const result = await new OrderControlListApiRequest().createOrderControlList(data);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalCheckListAction.createCheckList.done({ params: null }));
        callback();
        successPopup("Список успешно добавлен.");
        await dispatch(ProposalCheckListThunk.getList(data.orderId, 1, 10));
      } catch (error) {
        dispatch(ProposalCheckListAction.createCheckList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  update(data: IOrderControlList, callback: () => void): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalCheckListAction.updateCheckList.started(null));
      try {
        const result = await new OrderControlListApiRequest().updateOrderControlList(data.id, data);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalCheckListAction.updateCheckList.done({ params: null }));
        callback();
        successPopup("Список успешно обновлён.");
        await dispatch(ProposalCheckListThunk.getList(data.orderId, 1, 10));
      } catch (error) {
        dispatch(ProposalCheckListAction.updateCheckList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getSettings(params: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterSettingsCheckListAction.infoSettings.started());
      try {
        const result = await new OrderControlListApiRequest().getOrderControlList(params);
        if (result.isError) {
          throw result;
        }
        dispatch(FilterConstructorAction.infoSettings(result.result.filters));
        dispatch(ProposalCheckListAction.infoSettings.done({ result: result.result }));
      } catch (error) {
        errorPopup(error.message);
        dispatch(ProposalCheckListAction.infoSettings.failed({ error }));
      }
    };
  },

  delete(id: number): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderControlListApiRequest().deleteOrderControlList(id);
        if (result?.isError) {
          throw result;
        }
        successPopup("Список успешно удалён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
