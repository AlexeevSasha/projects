import { IOrderQualityCriterion } from "common/interfaces/order/IOrderQualityCriterion";
import { IRegisterQualityCriterion } from "common/interfaces/register/IRegisterQualityCriterion";
import { RegisterSettingsCheckListAction } from "module/registerSettingsCheckList/registerSettingsCheckListAction";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IBizObjWithFields } from "../../common/interfaces/IBizObjWithFields";
import { IFilterComparisonOperator } from "../../common/interfaces/IFilterComparisonOperator";
import { IFilter } from "../../common/interfaces/IFilter";
import { IRegisterFieldBase } from "../../common/interfaces/register/IRegisterFieldBase";
import { FilterConstructorAction } from "./filterConstructorAction";
import { IObservationJsonFields } from "../../common/interfaces/IObservationJsonFields";

export interface IState {
  criterions: IOrderQualityCriterion[]; // Доступные требования для КС
  currentCriterions: IOrderQualityCriterion[]; // для селектора в ТК
  qualityCriterion: IRegisterQualityCriterion[]; // Данные конструктора требований

  // Конструктор фильтров(настроек) для
  conditions: IFilter[];
  conditionIds: Record<number, number[]>;

  // Конструктор дополнительных фильтров(настроек)
  additionalConditions: IFilter[];
  additionalConditionIds: Record<number, number[]>;
  // Данные для выпадающих списков
  selects: {
    comparison: IFilterComparisonOperator[];
    bizObjWithFields: IBizObjWithFields[];
    field?: IRegisterFieldBase[];
  };
  loading: "load" | "resolve" | "reject";
  selectsLoading: boolean;

  jsonObservation: IObservationJsonFields[];

  searchSql: string;

  searchType: boolean; // Тип конструктора: true(конструктор); false(текст SQL)
}

export const InitialState: IState = {
  criterions: [],
  currentCriterions: [],
  qualityCriterion: [],

  conditions: [],
  conditionIds: {},
  additionalConditions: [],
  additionalConditionIds: {},

  selects: { comparison: [], bizObjWithFields: [] },
  loading: "resolve",
  selectsLoading: false,

  jsonObservation: [],

  searchSql: "",
  searchType: true,
};

export const filterConstructorReducer = reducerWithInitialState(InitialState)
  .case(FilterConstructorAction.getConditions.started, (state) => ({ ...state, loading: "load", searchSql: "" }))
  .case(FilterConstructorAction.getConditions.failed, (state) => ({ ...state, loading: "reject" }))
  .case(FilterConstructorAction.getConditions.done, (state, { result }) => ({
    ...state,
    conditions: result.items,
    conditionIds: result.items.reduce(
      (obj, { id, parentId }) => ({
        ...obj,
        [parentId]: !obj[parentId] ? [id] : [...obj[parentId], id],
      }),
      {}
    ),
    loading: "resolve",

    searchSql: result.searchSql,
    searchType: result.searchType,
  }))

  .case(FilterConstructorAction.infoSettings, (state, result) => {
    return {
      ...state,
      conditions: result,
      conditionIds: result.reduce(
        (obj, { id, parentId }) => ({
          ...obj,
          [parentId]: !obj[parentId] ? [id] : [...obj[parentId], id],
        }),
        {}
      ),
    };
  })

  .case(FilterConstructorAction.infoAdditionalSettings, (state, result) => ({
    ...state,
    additionalConditions: result,
    additionalConditionIds: result.reduce(
      (obj, { id, parentId }) => ({
        ...obj,
        [parentId]: !obj[parentId] ? [id] : [...obj[parentId], id],
      }),
      {}
    ),
  }))

  .case(FilterConstructorAction.updateSearchType, (state, payload) => ({
    ...state,
    searchType: payload === "Конструктор",
  }))

  .case(FilterConstructorAction.updateSearchSql, (state, payload) => ({
    ...state,
    searchSql: payload,
  }))

  .case(FilterConstructorAction.infoFilters.started, (state) => ({
    ...state,
    selectsLoading: true,
  }))
  .case(FilterConstructorAction.infoFilters.failed, (state) => ({
    ...state,
    selectsLoading: false,
  }))
  .case(FilterConstructorAction.infoFilters.done, (state, { result }) => ({
    ...state,
    selects: result,
    selectsLoading: false,
  }))

  .case(RegisterSettingsCheckListAction.getQualityCriterion.done, (state, { result }) => ({
    ...state,
    criterions: result,
  }))
  .case(RegisterSettingsCheckListAction.getQualityCurrentCriterion, (state, { result }) => {
    const allElem = [...state.currentCriterions, ...result];
    const criterions = Array.from(new Map(allElem.map((item) => [item["id"], item])).values());
    return {
      ...state,
      currentCriterions: criterions,
    };
  })
  .case(FilterConstructorAction.clearFilter, (state) => ({
    ...state,
    conditions: [],
    conditionIds: {},
    additionalConditions: [],
    additionalConditionIds: {},
  }))
  .case(FilterConstructorAction.clearConditionsValue, (state, payload) => ({
    ...state,
    conditions:
      payload.type !== "additionalCriterion"
        ? state.conditions.map((el, indx) => {
            const values = indx === payload.pos && el.filterLevel === payload.filterLevel ? [] : el.values;
            return { ...el, values };
          })
        : state.conditions,
    additionalConditions:
      payload.type === "additionalCriterion"
        ? state.additionalConditions.map((el, indx) => {
            const values = indx === payload.pos && el.filterLevel === payload.filterLevel ? [] : el.values;
            return { ...el, values };
          })
        : state.additionalConditions,
  }))

  .case(FilterConstructorAction.getJsonObservation.done, (state, payload) => ({
    ...state,
    jsonObservation: payload.result,
  }))

  .build();
