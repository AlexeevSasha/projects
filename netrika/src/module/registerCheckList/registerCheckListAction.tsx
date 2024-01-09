import { actionCreator } from "../../store/action/actionCreator";
import { IControlList } from "../../common/interfaces/control/IControlList";
import { IDownloadXls } from "./registerCheckListReducer";
import { IControlListsFields } from "../../common/interfaces/control/IControlListsField";
import { IControlListsFilter } from "../../common/interfaces/control/IControlListsFilter";
import { RegisterFieldTypeEnum } from "../../common/interfaces/RegisterFieldTypeEnum";
import { IFilter } from "../../common/interfaces/IFilter";
import { ComparisonOperatorEnum } from "../../common/interfaces/ComparisonOperatorEnum";
import { ComparisonValueTypeEnum } from "../../common/interfaces/ComparisonValueTypeEnum.g";

export class RegisterCheckListAction {
  static infoControlList = actionCreator.async<null, IControlList[], Error>("Register/ControlList_INFO");
  static infoControlListResult = actionCreator.async<
    null,
    { Total: 0; FilteredTotal: 0; items: []; itemsNames: [] },
    Error
  >("Register/ControlList_INFO_Result");
  static controlListFields = actionCreator.async<null, IControlListsFields, Error>("Register/ControlList_Field");
  static controlListFilter = actionCreator.async<null, IControlListsFilter, Error>("Register/ControlList_Filter");
  static controlListFilterError = actionCreator<string>("Register/ControlList_Filter_Eror");

  static sortingControlList = actionCreator.async<null, Error>("Register/ControlList_SORTING");
  static updateActiveList = actionCreator<number>("Register/ControlList_updateActiveList");
  static updateLastLoadList = actionCreator<number | undefined>("Register/ControlList_updateLastLoadList");

  static updateInfoControlList = actionCreator<IControlList[]>("Register/UPDATE_ControlList_INFO");

  static getInfoXls = actionCreator.async<number, IDownloadXls, Error>("Register/GET_INFO_XLS");
  static getInfoXlsPatientCase = actionCreator.async<number, IDownloadXls, Error>("Register/GET_INFO_PATIENT_CASE_XLS");
  static getInfoCsv = actionCreator.async<number, IDownloadXls, Error>("Register/GET_INFO_CSV");
  static checkLoadXls = actionCreator.async<null, boolean, Error>("Register/CHECK_LOAD_XLS");

  static defVal = actionCreator.async<
    null,
    {
      bizId: number;
      id: number;
      description: string;
      type: RegisterFieldTypeEnum;
      hasDictionaryValues: boolean;
      values: IFilter["values"];
      comparisons: {
        value: string;
        label: string;
        operator: ComparisonOperatorEnum;
        display: string;
        availableTypes: RegisterFieldTypeEnum[];
        comparisonValueType: ComparisonValueTypeEnum;
        useDictionaryValues: boolean;
      }[];
      comparisonValue?: ComparisonOperatorEnum | string;
    }[],
    Error
  >("Register/defVal");
}
