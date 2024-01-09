import { IGetOrderCriterionListFiltersResponse } from "common/interfaces/IGetOrderCriterionListFiltersResponse";
import { IBizObjWithFields } from "../../common/interfaces/IBizObjWithFields";
import { IFilterComparisonOperator } from "../../common/interfaces/IFilterComparisonOperator";
import { IFilter } from "../../common/interfaces/IFilter";
import { IRegisterFieldBase } from "../../common/interfaces/register/IRegisterFieldBase";
import { actionCreator } from "../../store/action/actionCreator";
import { IObservationJsonFields } from "../../common/interfaces/IObservationJsonFields";
import { IFilterType } from "./IFilterType.g";

export class FilterConstructorAction {
  static getConditions = actionCreator.async<number, IGetOrderCriterionListFiltersResponse, Error>("GET_FILTERS");
  static infoSettings = actionCreator<IFilter[]>("FILTER_INFO");
  static infoAdditionalSettings = actionCreator<IFilter[]>("FILTER_INFO_ADDITIONAL_SETTINGS");
  static updateSearchType = actionCreator<string>("FILTER_TYPE");
  static getJsonObservation = actionCreator.async<void, IObservationJsonFields[], Error>("FILTER_TYPE");
  static updateSearchSql = actionCreator<string>("INPUT_SEARCH_SQL");
  static clearFilter = actionCreator<boolean>("Proposal/CLEAR_FILTER");
  static clearConditionsValue = actionCreator<{ pos: number; type: IFilterType["type"]; filterLevel: number }>(
    "Proposal/CONDITIONS_VALUE"
  );
  static infoFilters = actionCreator.async<
    void,
    {
      comparison: IFilterComparisonOperator[];
      bizObjWithFields: IBizObjWithFields[];
      field?: IRegisterFieldBase[];
    },
    Error
  >("SETTING_FILTER_INFO");
}
