import { OrderQualityCriterionApiRequest } from "api/orderQualityCriterionApiRequest";
import { IOrderQualityCriterion } from "../../common/interfaces/order/IOrderQualityCriterion";
import { IAppDispatch, IAppState, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { ProposalQualityRequirementsAction } from "./proposalQualityRequirementsAction";
import { OrderApiRequest } from "../../api/orderApiRequest";
import { IOrderQualityCriterionCurrentItem } from "../../common/interfaces/order/IOrderQualityCriterionLIstItem";
import { IPompStage } from "../../common/interfaces/IPompStage";
import { IClinrecStage } from "../../common/interfaces/clinrec/IClinrecStage";

export const ProposalQualityRequirementsThunk = {
  getList(id: number, page: number, size: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalQualityRequirementsAction.list.started(null));
      try {
        const result = await new OrderQualityCriterionApiRequest().getOrderCriterionQuality(id, page, size);
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalQualityRequirementsAction.list.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.list.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getParentCriterion(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalQualityRequirementsAction.parentCriterion.started(null));
      try {
        const result = await new OrderQualityCriterionApiRequest().getParentCriterion(id);
        if (result.isError) {
          throw result;
        }

        let convertResult = result.result.map((item) => {
          return { value: item.id.toString(), label: item.name };
        });
        convertResult = [{ value: "0", label: "..." }, ...convertResult];

        dispatch(
          ProposalQualityRequirementsAction.parentCriterion.done({
            params: null,
            result: convertResult,
          })
        );
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.parentCriterion.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getOrderCriterionQualityById(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalQualityRequirementsAction.fullItem.started(null));
      try {
        const result = await new OrderQualityCriterionApiRequest().getOrderCriterionQualityItem(id);
        if (result.isError) {
          throw result;
        }
        dispatch(
          ProposalQualityRequirementsAction.fullItem.done({
            params: null,
            result: result.result,
          })
        );
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.fullItem.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getOrderCriterionQualityQuery(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalQualityRequirementsAction.queryList.started(null));
      try {
        const result = await new OrderQualityCriterionApiRequest().getOrderCriterionQualityQueryList();
        if (result.isError) {
          throw result;
        }

        dispatch(
          ProposalQualityRequirementsAction.queryList.done({
            params: null,
            result: result.result,
          })
        );
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.queryList.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  create(data: IOrderQualityCriterion): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderQualityCriterionApiRequest().createOrderQualityCriterion(data);
        if (result.isError) {
          throw result;
        }
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  update(
    data: IOrderQualityCriterion,
    formCrOrPomp?: boolean,
    setQualityCriterionItem?: (value: IOrderQualityCriterionCurrentItem) => void
  ): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderQualityCriterionApiRequest().updateOrderQualityCriterion(data.id, data);
        if (result.isError) {
          throw result;
        }
        formCrOrPomp &&
          ProposalQualityRequirementsAction.fullItem.done({
            params: null,
            result: result.result,
          });
        if (setQualityCriterionItem) {
          formCrOrPomp && setQualityCriterionItem(result.result);
        }
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },

  delete(id: number): IThunkAction {
    return async (): Promise<void> => {
      try {
        const result = await new OrderQualityCriterionApiRequest().deleteOrderQualityCriterion(id);
        if (result.isError) {
          throw result;
        }
        successPopup(result.message);
      } catch (error) {
        errorPopup(error.message);
      }
    };
  },
  getOrderClinrec(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalQualityRequirementsAction.clinrec.started(null));
      try {
        const result = await new OrderApiRequest().getOrderClinrec(id);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalQualityRequirementsAction.clinrec.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.clinrec.failed(error));
        errorPopup(error.message);
      }
    };
  },
  getOrderPomp(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalQualityRequirementsAction.pomp.started(null));
      try {
        const result = await new OrderApiRequest().getOrderPomp(id);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalQualityRequirementsAction.pomp.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.pomp.failed(error));
        errorPopup(error.message);
      }
    };
  },
  generateOrderClinrec(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalQualityRequirementsAction.generateClinrec.started(null));
      try {
        const result = await new OrderApiRequest().generateOrderClinrec(id);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalQualityRequirementsAction.generateClinrec.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.generateClinrec.failed(error));
        errorPopup(error.message);
      }
    };
  },
  generateOrderPomp(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalQualityRequirementsAction.generatePomp.started(null));
      try {
        const result = await new OrderApiRequest().generateOrderPomp(id);
        if (result?.isError) {
          throw result;
        }
        dispatch(ProposalQualityRequirementsAction.generatePomp.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.generatePomp.failed(error));
        errorPopup(error.message);
      }
    };
  },
  sortingPompStage(PompIndex: number, graphIndex: number, parentId: number, sortArr: IPompStage[]): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const oldOrderPomp = getState().proposalQualityRequirements.orderPomp;
      dispatch(ProposalQualityRequirementsAction.sortingPompStage.started(null));
      try {
        const result = await new OrderApiRequest().sortPompStage(
          sortArr.map((item, index) => ({ idParent: parentId, stageId: item.stageCode, orderSort: index }))
        );
        if (result?.isError) {
          throw result;
        }
        const newOrderPomp = oldOrderPomp?.map((pomp, index) =>
          index !== PompIndex
            ? { ...pomp }
            : {
                ...pomp,
                graphs: pomp?.graphs.map((graph, index) =>
                  index !== graphIndex ? { ...graph } : { ...graph, pompStages: sortArr }
                ),
              }
        );
        dispatch(ProposalQualityRequirementsAction.sortingPompStage.done({ params: null, result: newOrderPomp }));
        successPopup(result.message);
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.sortingPompStage.done({ params: null, result: oldOrderPomp }));

        errorPopup(error.message);
      }
    };
  },
  sortinClinrecStage(clinrecIndex: number, parentId: number, sortArr: IClinrecStage[]): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      const oldOrderClinrec = getState().proposalQualityRequirements.orderClinrec;
      dispatch(ProposalQualityRequirementsAction.sortingClinrecStage.started(null));
      try {
        const result = await new OrderApiRequest().sortClinrecStage(
          sortArr.map((item, index) => ({ idParent: parentId, stageId: item.stageCode, orderSort: index }))
        );
        if (result?.isError) {
          throw result;
        }
        const newOrderClinrec = oldOrderClinrec?.map((clinrec, index) =>
          index !== clinrecIndex
            ? { ...clinrec }
            : {
                ...clinrec,
                stages: sortArr,
              }
        );
        dispatch(ProposalQualityRequirementsAction.sortingClinrecStage.done({ params: null, result: newOrderClinrec }));
        successPopup(result.message);
      } catch (error) {
        dispatch(ProposalQualityRequirementsAction.sortingClinrecStage.done({ params: null, result: oldOrderClinrec }));

        errorPopup(error.message);
      }
    };
  },
};
