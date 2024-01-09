import { IControllerResponse } from "common/interfaces/response/IControllerResponse";
import { validateNameRegister } from "common/constants/validate";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IControlListWithFilter } from "../../common/interfaces/control/IControlListWithFilter";
import { RegisterSettingsCheckListAction } from "./registerSettingsCheckListAction";
import { ITestControlList } from "../../common/interfaces/ITestControlList";

interface IState {
  setting: IControlListWithFilter;
  testCheckList?: IControllerResponse<ITestControlList>;
  loading: boolean;
  errors: Record<string, boolean>;
  disabledSave?: boolean;
}

const InitialState: IState = {
  setting: {} as IControlListWithFilter,
  loading: false,
  errors: { sql: true },
  testCheckList: undefined,
};

export const registerSettingsCheckListReducer = reducerWithInitialState(InitialState)
  .case(RegisterSettingsCheckListAction.infoSettings.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(RegisterSettingsCheckListAction.infoSettings.done, (state, { result }) => ({
    ...state,
    setting: result,
    loading: false,
    testCheckList: undefined,
    errors: { sql: true },
  }))
  .case(RegisterSettingsCheckListAction.infoSettings.failed, (state) => ({
    ...state,
    loading: false,
  }))

  .case(RegisterSettingsCheckListAction.updateName, (state, payload) => ({
    ...state,
    setting: { ...state.setting, name: payload },
    errors: { ...state.errors, name: !payload || !validateNameRegister(payload) },
  }))
  .case(RegisterSettingsCheckListAction.updateIsExtendedKs, (state, payload) => ({
    ...state,
    setting: { ...state.setting, isExtendedKs: payload },
  }))
  .case(RegisterSettingsCheckListAction.updateDescription, (state, payload) => ({
    ...state,
    setting: { ...state.setting, description: payload },
    disabledSave: false,
    testCheckList: undefined,
  }))

  .case(RegisterSettingsCheckListAction.updateDisabledSave, (state, payload) => ({
    ...state,
    disabledSave: payload,
  }))

  .case(RegisterSettingsCheckListAction.updateSearchType, (state, payload) => ({
    ...state,
    setting: { ...state.setting, searchType: payload === "Конструктор" },
  }))

  .case(RegisterSettingsCheckListAction.updateSearchSql, (state, payload) => ({
    ...state,
    setting: { ...state.setting, searchSql: payload },
    errors: { ...state.errors, sql: true },
  }))

  .case(RegisterSettingsCheckListAction.updateFieldsValues, (state, payload) => ({
    ...state,
    setting: { ...state.setting, searchFields: payload },
    errors: { ...state.errors, sql: true },
  }))

  .case(RegisterSettingsCheckListAction.setErrorName, (state, payload) => ({
    ...state,
    setting: { ...state.setting },
    errors: { ...state.errors, name: payload },
  }))
  .case(RegisterSettingsCheckListAction.setErrorConditionsAndCurrentCriterion, (state, payload) => ({
    ...state,
    setting: { ...state.setting },
    errors: { ...state.errors, conditionsAndCurrentCriterion: payload },
  }))

  /* **************************************************************************** */
  /* **************************************************************************** */
  /* **************************************************************************** */
  /* **************************************************************************** */
  .case(RegisterSettingsCheckListAction.testCheckList.started, (state) => ({
    ...state,
    loading: true,
  }))

  .case(RegisterSettingsCheckListAction.testCheckList.started, (state) => ({
    ...state,
    loading: true,
  }))

  .case(RegisterSettingsCheckListAction.testCheckList.done, (state, { result }) => ({
    ...state,
    setting:
      result.result.conclusion === "sql invalid" || result.isError
        ? state.setting
        : { ...state.setting, searchSql: result.result.resultSql },
    testCheckList: result,
    disabledSave: result.result.conclusion === "sql invalid",
    errors: {
      ...state.errors,
      name: !state.setting.name,
      sql: result.result.conclusion === "sql invalid",
    },
    loading: false,
  }))

  .case(RegisterSettingsCheckListAction.testCheckList.failed, (state) => ({
    ...state,
    loading: false,
  }))

  .case(RegisterSettingsCheckListAction.addQuality, (state, quality) => ({
    ...state,
    setting: {
      ...state.setting,
      qualityCriterion: [...(state.setting.qualityCriterion || []), quality],
    },
    errors: { ...state.errors, sql: true },
    testCheckList: undefined,
  }))

  .case(RegisterSettingsCheckListAction.updateQuality, (state, { id, newItem }) => ({
    ...state,
    setting: {
      ...state.setting,
      qualityCriterion: state.setting.qualityCriterion.map((item) => (item.id === id ? newItem : item)),
    },
    errors: { ...state.errors, sql: true },
    testCheckList: undefined,
  }))

  .case(RegisterSettingsCheckListAction.updateQualityQueryResult, (state, { id, queryResult }) => ({
    ...state,
    setting: {
      ...state.setting,
      qualityCriterion: state.setting.qualityCriterion.map((item) =>
        item.id === id ? { ...item, queryResult } : item
      ),
    },
    errors: { ...state.errors, sql: true },
    testCheckList: undefined,
  }))

  .case(RegisterSettingsCheckListAction.updateQualityParamsValue, (state, { id, value }) => ({
    ...state,
    setting: {
      ...state.setting,
      qualityCriterion: state.setting.qualityCriterion.map((item) =>
        item.id === id ? { ...item, qualityParamsValue: value } : item
      ),
    },
    errors: { ...state.errors, sql: true },
    testCheckList: undefined,
  }))

  .case(RegisterSettingsCheckListAction.deleteQuality, (state, id) => ({
    ...state,
    setting: {
      ...state.setting,
      qualityCriterion: state.setting.qualityCriterion.filter((item) => item.id !== id),
    },
    errors: { ...state.errors, sql: true },
    testCheckList: undefined,
  }))
  .case(RegisterSettingsCheckListAction.clearQuality, (state) => ({
    ...state,
    setting: {
      ...state.setting,
      qualityCriterion: [],
    },
    errors: { ...state.errors, sql: true },
    testCheckList: undefined,
  }))
  .case(RegisterSettingsCheckListAction.clearQualityCriterion, (state) => ({
    ...state,
    setting: {
      ...state.setting,
      qualityCriterion: state.setting.qualityCriterion.map((item) => ({
        ...item,
        params: [],
      })),
    },
    errors: { ...state.errors, sql: true },
    testCheckList: undefined,
  }))

  .build();
