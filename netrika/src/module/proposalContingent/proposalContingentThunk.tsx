import { OrderContingentApiRequest } from "api/orderContingentApiRequest";
import { IOrderContingent } from "../../common/interfaces/order/IOrderContingent";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { ProposalContingentAction } from "./proposalContingentAction";

export const ProposalContingentThunk = {
  getList(id: number, page: number, size: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalContingentAction.list.started(null));
      try {
        const result = await new OrderContingentApiRequest().getOrderContingents(id, page, size);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalContingentAction.list.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalContingentAction.list.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },
  getIamScriptsParam(scriptId: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalContingentAction.iamScriptsParams.started(null));
      try {
        const result = await new OrderContingentApiRequest().getIamScriptsParam(scriptId);
        if (result?.isError) {
          throw result;
        }
        dispatch(
          ProposalContingentAction.iamScriptsParams.done({
            params: null,
            result:
              result.result?.map((r) => ({
                paramId: r.id,
                type: r.type,
                value: "",
                nsiUid: r.nsiUid,
                description: r.description,
                exampleValue: r.exampleValue,
              })) || null,
          })
        );
      } catch (error) {
        dispatch(ProposalContingentAction.iamScriptsParams.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getListType(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalContingentAction.listType.started(null));
      try {
        const result = await new OrderContingentApiRequest().getElementTypes();
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalContingentAction.listType.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalContingentAction.listType.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  create(data: IOrderContingent): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderContingentApiRequest().createOrderContingent(data);
        if (result?.isError) {
          throw result;
        }
        successPopup("Отчёт успешно добавлен.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  update(data: IOrderContingent): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderContingentApiRequest().updateOrderContingent(data.id, data);
        if (result?.isError) {
          throw result;
        }
        successPopup("Отчёт успешно изменён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  delete(id: number): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderContingentApiRequest().deleteOrderContingent(id);
        if (result?.isError) {
          throw result;
        }
        successPopup("Отчёт успешно удалён.");
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
};
