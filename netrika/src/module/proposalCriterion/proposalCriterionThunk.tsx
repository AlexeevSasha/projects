import { CommonToolsApiRequest } from "api/сommonToolsApiRequest";
import { OrderCriterionListFilterApiRequest } from "api/orderCriterionListFilterApiRequest";
import { OrderInclusionCriteriaApiRequest } from "api/orderInclusionCriteriaApiRequest";
import { IOrderInclusionCriteria } from "../../common/interfaces/order/IOrderInclusionCriteria";
import { IAppDispatch, IAppState, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { FilterConstructorAction } from "../filter/filterConstructorAction";
import { ProposalCriterionAction } from "./proposalCriterionAction";

export const ProposalCriterionThunk = {
  getCriterionText(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(ProposalCriterionAction.text.started(null));
      try {
        const result = await new OrderInclusionCriteriaApiRequest().getOrderInclusionCriteria(id);
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalCriterionAction.text.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(ProposalCriterionAction.text.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  updateCriterionText(params: IOrderInclusionCriteria): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        dispatch(ProposalCriterionAction.updateCriterionText.started(params));
        const result = await new OrderInclusionCriteriaApiRequest().updateOrderInclusionCriteria(
          params.orderId,
          params.criteriaDescription
        );
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalCriterionAction.updateCriterionText.done({ params }));
        successPopup("Критерий успешно сохранён.");
      } catch (error) {
        dispatch(ProposalCriterionAction.updateCriterionText.failed({ params, error }));
        errorPopup(error.message);
      }
    };
  },

  getCriterionFilters(params: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(FilterConstructorAction.getConditions.started(params));
      try {
        const result = await new OrderCriterionListFilterApiRequest().getOrderCriterionListFilters(params);
        if (result.isError) {
          throw result;
        }
        dispatch(
          FilterConstructorAction.getConditions.done({
            params,
            result: { ...result.result, items: result.result.items.filter((elem) => elem.filterLevel === 0) },
          })
        );
        dispatch(
          FilterConstructorAction.infoAdditionalSettings(result.result.items.filter((elem) => elem.filterLevel === 1))
        );
      } catch (error) {
        dispatch(FilterConstructorAction.getConditions.failed({ params, error }));
        errorPopup(error.message);
      }
    };
  },

  getCriterionFind(): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(FilterConstructorAction.infoFilters.started());
      try {
        const result = await Promise.all([
          new CommonToolsApiRequest().getComparisonOperators(),
          new OrderCriterionListFilterApiRequest().getCriterionBizObj(),
        ]);
        if (result[0].isError) {
          errorPopup(result[0].message);
          throw result[0];
        }

        if (result[1].isError) {
          errorPopup(result[1].message);
          throw result[1];
        }

        dispatch(
          FilterConstructorAction.infoFilters.done({
            result: { comparison: result[0].result, bizObjWithFields: result[1].result },
          })
        );
      } catch (error) {
        dispatch(FilterConstructorAction.infoFilters.failed({ error }));
      }
    };
  },

  updateCriterionFilters(params: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        dispatch(ProposalCriterionAction.saveCriterions.started(params));
        const result = await new OrderCriterionListFilterApiRequest().updateOrderCriterionListFilter(params, {
          items: getState().filterReducer.conditions,
          searchSql: getState().filterReducer.searchSql,
          searchType: getState().filterReducer.searchType,
        });
        if (result.isError) {
          throw result;
        }
        dispatch(ProposalCriterionAction.saveCriterions.done({ params }));
        dispatch(this.getCriterionFilters(params));
        successPopup("Изменения сохранены.");
      } catch (error) {
        dispatch(ProposalCriterionAction.saveCriterions.failed({ params, error }));
        errorPopup(error.message);
      }
    };
  },

  autoCreateRegister(params: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        dispatch(ProposalCriterionAction.autoCreateRegister.started(params));
        // await requestsRepository.orderApiRequest.autoCreateRegister(params);
        const result = await new OrderCriterionListFilterApiRequest().createRegister(params, {
          items: [...getState().filterReducer.conditions, ...getState().filterReducer.additionalConditions],
          searchSql: getState().filterReducer.searchSql,
          searchType: getState().filterReducer.searchType,
        });
        if (result.isError) {
          throw result;
        } else {
          successPopup(result.result.conclusion);
        }
        dispatch(ProposalCriterionAction.autoCreateRegister.done({ params }));
        dispatch(ProposalCriterionAction.testCriterion.done({ result: result }));
      } catch (error) {
        dispatch(ProposalCriterionAction.autoCreateRegister.failed({ params, error }));
        errorPopup(error.message);
      }
    };
  },

  updateRegister(params: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        dispatch(ProposalCriterionAction.updateRegister.started(params));
        const result = await new OrderCriterionListFilterApiRequest().updateRegister(params, {
          items: [...getState().filterReducer.conditions, ...getState().filterReducer.additionalConditions],
          searchSql: getState().filterReducer.searchSql,
          searchType: getState().filterReducer.searchType,
        });
        if (result.isError) {
          throw result;
        } else {
          successPopup(result.result.conclusion);
        }
        dispatch(ProposalCriterionAction.updateRegister.done({ params }));
        dispatch(ProposalCriterionAction.testCriterion.done({ result: result }));
      } catch (error) {
        dispatch(ProposalCriterionAction.updateRegister.failed({ params, error }));
        errorPopup(error.message);
      }
    };
  },

  testCriterion(params: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        dispatch(ProposalCriterionAction.testCriterion.started());

        const result = await new OrderCriterionListFilterApiRequest().testOrderCriterionListFilter(params, {
          items: [...getState().filterReducer.conditions, ...getState().filterReducer.additionalConditions],
          searchSql: getState().filterReducer.searchSql,
          searchType: getState().filterReducer.searchType,
        });
        dispatch(ProposalCriterionAction.testCriterion.done({ result }));
        dispatch(FilterConstructorAction.updateSearchSql(result.result.resultSql));
      } catch (error) {
        dispatch(ProposalCriterionAction.testCriterion.failed({ error }));
      }
    };
  },
};
