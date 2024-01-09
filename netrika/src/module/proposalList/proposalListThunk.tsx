import { OrderApiRequest } from "api/orderApiRequest";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { ProposalListAction } from "./proposalListAction";
import { IGetOrdersRequest } from "../../common/interfaces/IGetOrdersRequest";

export const ProposalListThunk = {
  getList(data: IGetOrdersRequest): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalListAction.list.started(null));
      try {
        const result = await new OrderApiRequest().getOrders(data);
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalListAction.list.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalListAction.list.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  delete(id: number): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderApiRequest().deleteOrder(id);
        if (result?.isError) {
          throw result;
        }
        successPopup("Заявка успешно удалена.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  registerGroup(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalListAction.registerGroup.started(null));
      try {
        const result = await new OrderApiRequest().getRegisterGroups();
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalListAction.registerGroup.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalListAction.registerGroup.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
};
