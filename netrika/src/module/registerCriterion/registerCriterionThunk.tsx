import { CommonToolsApiRequest } from "api/сommonToolsApiRequest";
import { OrderCriterionListFilterApiRequest } from "api/orderCriterionListFilterApiRequest";
import { RegisterApiRequest } from "api/registerApiRequest";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { FilterConstructorAction } from "../filter/filterConstructorAction";
import { RegisterCriterionAction } from "./registerCriterionAction";

export const RegisterCriterionThunk = {
  getCriterionText(id: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(RegisterCriterionAction.text.started(null));
      try {
        const result = await new RegisterApiRequest().getOrderInclusionCriterion(id);
        if (result.isError) {
          throw result;
        }
        dispatch(RegisterCriterionAction.text.done({ params: null, result: result.result }));
      } catch (error) {
        dispatch(RegisterCriterionAction.text.failed({ params: null, error }));
        errorPopup(error.message);
      }
    };
  },

  getCriterionFilters(params: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const result = await new RegisterApiRequest().getOrderCriterionList(params);
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
        // dispatch(FilterConstructorAction.infoSettings(result.result.items));
      } catch (error) {
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
};
