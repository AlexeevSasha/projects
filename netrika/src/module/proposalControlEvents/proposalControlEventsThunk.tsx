import { OrderControlEventApiRequest } from "api/OrderControlEventApiRequest.g";
import { IOrderControlEvent } from "../../common/interfaces/order/IOrderControlEvent";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { ProposalControlEventsAction } from "./proposalControlEventsAction";

export const ProposalControlEventsThunk = {
  getList(id: number, page: number, size: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalControlEventsAction.list.started(null));
      try {
        const result = await new OrderControlEventApiRequest().getOrderControlEvents(id, page, size);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalControlEventsAction.list.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalControlEventsAction.list.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  create(data: IOrderControlEvent): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderControlEventApiRequest().createOrderControlEvent(data);
        if (result?.isError) {
          throw result;
        }
        successPopup("Событие успешно добавлено.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  update(data: IOrderControlEvent): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderControlEventApiRequest().updateOrderControlEvent(data.id, data);
        if (result?.isError) {
          throw result;
        }
        successPopup("Событие успешно изменено.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  delete(id: number): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderControlEventApiRequest().deleteOrderControlEvent(id);
        if (result?.isError) {
          throw result;
        }
        successPopup("Событие успешно удалено.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
