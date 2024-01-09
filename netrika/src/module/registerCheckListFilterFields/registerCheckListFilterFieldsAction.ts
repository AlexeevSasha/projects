import { actionCreator } from "../../store/action/actionCreator";
import {
  IRegisterFilterFields,
  IRegisterFilterFieldsFilterGroup,
} from "../../common/interfaces/register/IRegisterFilterFields";

export class RegisterCheckListFilterFieldsAction {
  static filterInfo = actionCreator.async<undefined, IRegisterFilterFields, Error>(
    "Register/ControlList_Constructor_Filter"
  );
  static updateFilterInfo = actionCreator.async<undefined, any, string>(
    "Register/ControlList_Constructor_Filter_Update"
  );
  static defaultFilterInfo = actionCreator.async<
    undefined,
    { filterGroup: IRegisterFilterFieldsFilterGroup[]; message?: string },
    Error
  >("Register/ControlList_Constructor_defaultFilterInfo");
}
