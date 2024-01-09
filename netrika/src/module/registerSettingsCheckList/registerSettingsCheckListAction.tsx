import { IControllerResponse } from "common/interfaces/response/IControllerResponse";
import { IOrderQualityCriterion } from "common/interfaces/order/IOrderQualityCriterion";
import { IQualityParamsValue } from "common/interfaces/quality/IQualityParamsValue";
import { IRegisterQualityCriterion } from "common/interfaces/register/IRegisterQualityCriterion";
import { IControlListWithFilter } from "../../common/interfaces/control/IControlListWithFilter";
import { actionCreator } from "../../store/action/actionCreator";
import { ITestControlList } from "../../common/interfaces/ITestControlList";

export class RegisterSettingsCheckListAction {
  static infoSettings = actionCreator.async<void, IControlListWithFilter, Error>("Register/Setting_Check_List_INFO");
  static getQualityCriterion = actionCreator.async<number, IOrderQualityCriterion[], Error>(
    "Register/GetQualityCriterion"
  );
  static getQualityCurrentCriterion = actionCreator<{ result: IOrderQualityCriterion[] }>(
    "Register/getQualityCurrentCurrentCriterion"
  );

  static updateName = actionCreator<string>("Register/updateName");
  static updateIsExtendedKs = actionCreator<boolean>("Register/updateIsExtendedKs");

  static updateDescription = actionCreator<string>("Register/updateDescription");
  static updateDisabledSave = actionCreator<boolean>("Register/updateDisabledSave");
  static updateSearchType = actionCreator<string>("Register/updateSearchType");
  static updateSearchSql = actionCreator<string>("Register/updateSearchSql");
  static updateFieldsValues = actionCreator<number[] | [] | null>("Register/FieldsValues");
  static testCheckList = actionCreator.async<void, IControllerResponse<ITestControlList>, Error>(
    "Register/TestCheckList"
  );
  static setErrorName = actionCreator<boolean>("Register/Error_Name");
  static setErrorConditionsAndCurrentCriterion = actionCreator<boolean>("Register/Error_ConditionsAndCurrentCriterion");
  static addQuality = actionCreator<IRegisterQualityCriterion>("Register/AddQuality");
  static updateQuality = actionCreator<{ id: number; newItem: IRegisterQualityCriterion }>("Register/updateQuality");
  static updateQualityQueryResult = actionCreator<{ id: number; queryResult: number }>(
    "Register/updateQualityQueryResult"
  );
  static updateQualityParamsValue = actionCreator<{ id: number; value: IQualityParamsValue[] }>(
    "Register/updateQualityParamsQuery"
  );
  static deleteQuality = actionCreator<number>("Register/deleteQuality");
  static clearQuality = actionCreator("Register/clearQuality");
  static clearQualityCriterion = actionCreator("Register/clearQualityCriterion");

  //  временно скрыто
  // static setSqlError = actionCreator("Register/SET_SQL_ERROR");
}
