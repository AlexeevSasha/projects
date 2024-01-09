import { DictionaryQualityCriterionQueryApiRequest } from "api/dictionaryQualityCriterionQueryApiRequest";
import { IQualityCriterionQueryDictionary } from "../../common/interfaces/quality/IQualityCriterionQueryDictionary";
import { IAppDispatch, IThunkAction } from "../../store/mainReducer";
import { errorPopup } from "../../common/helpers/toast/error";
import { successPopup } from "../../common/helpers/toast/success";
import { DictionaryCriterionAction } from "./dictionaryQualityCriterionQueryAction";

const { getCriterions, deleteCriterion, createCriterion, updateCriterion } = DictionaryCriterionAction;

export const DictionaryQualityCriterionQueryThunk = {
  getDictionarySearch(params: any): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      const { pageIndex, pageSize, searchText } = params;
      dispatch(getCriterions.started(params));
      try {
        const result = await new DictionaryQualityCriterionQueryApiRequest().getDictionaryWithSearch(
          pageIndex,
          pageSize,
          searchText
        );
        if (result.isError) {
          throw result;
        }
        dispatch(getCriterions.done({ params, result: result.result }));
      } catch (error) {
        dispatch(getCriterions.failed({ params, error }));
        errorPopup(error.message);
      }
    };
  },

  createQualityCriterionQuery(params: IQualityCriterionQueryDictionary, filter: any): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(createCriterion.started(params));
      try {
        const result = await new DictionaryQualityCriterionQueryApiRequest().createQualityCriterionQuery({
          ...params,
          params: params.params.map((p) => (!p.catalog ? { ...p, nsiUid: "" } : p)),
        });
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryQualityCriterionQueryThunk.getDictionarySearch(filter));
        successPopup("Элемент справочника успешно добавлен.");
      } catch (error) {
        dispatch(createCriterion.failed({ params, error }));
        errorPopup(error.message);
      }
    };
  },

  updateQualityCriterionQuery(params: IQualityCriterionQueryDictionary, filter: any): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(updateCriterion.started(params));
      try {
        const result = await new DictionaryQualityCriterionQueryApiRequest().updateQualityCriterionQuery(params.id, {
          ...params,
          params: params.params.map((p) => (!p.catalog ? { ...p, nsiUid: "" } : p)),
        });
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryQualityCriterionQueryThunk.getDictionarySearch(filter));
        successPopup("Элемент справочника успешно изменён.");
      } catch (error) {
        dispatch(updateCriterion.failed({ params, error }));
        errorPopup(error.message);
      }
    };
  },

  deleteQualityCriterionQuery(params: number[], filter: any): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      dispatch(deleteCriterion.started(params));
      try {
        const result = await new DictionaryQualityCriterionQueryApiRequest().deleteQualityCriterionQuery(params);
        if (result.isError) {
          throw result;
        }
        dispatch(DictionaryQualityCriterionQueryThunk.getDictionarySearch(filter));
        successPopup("Элемент справочника успешно удалён.");
      } catch (error) {
        errorPopup(error.message);
        dispatch(deleteCriterion.failed({ params, error }));
      }
    };
  },
};
