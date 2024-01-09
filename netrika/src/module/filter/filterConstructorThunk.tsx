import { ProposalCriterionAction } from "module/proposalCriterion/proposalCriterionAction";
import { RegisterSettingsCheckListAction } from "module/registerSettingsCheckList/registerSettingsCheckListAction";
import { ConditionOperatorEnum } from "../../common/interfaces/ConditionOperatorEnum";
import { IFilter } from "../../common/interfaces/IFilter";
import { IAppDispatch, IAppState, IThunkAction } from "../../store/mainReducer";
import { FilterConstructorAction } from "./filterConstructorAction";
import { IFilterType } from "./IFilterType.g";
import {
  constructorAddElement,
  constructorDeleteElement,
  constructorMoveLeft,
  constructorMoveRight,
  constructorSelectFieldBizObj,
  constructorSelectFieldName,
  constructorSelectFieldType,
  constructorUpdateVariates,
  constructorWriteFieldMultiValue,
  customConstructorAddElement,
} from "./methodFilterConstructor";
import { DictionaryDefaultRegisterFieldsApiRequest } from "../../api/dictionaryDefaultRegisterFieldsApiRequest";

export const FilterConstructorThunk = {
  updateVariates(elemId: number, type: IFilterType["type"]): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        switch (type) {
          case "criterion": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorUpdateVariates(getState().filterReducer.conditions, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "additionalCriterion": {
            dispatch(
              FilterConstructorAction.infoAdditionalSettings(
                constructorUpdateVariates(getState().filterReducer.additionalConditions, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "filterCheckList": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorUpdateVariates(getState().filterReducer.conditions, elemId)
              )
            );
            dispatch(RegisterSettingsCheckListAction.updateDisabledSave(true));
            break;
          }
          default: {
            console.log("Error: Неизвестный тип action");
          }
        }
      } catch (error) {
        console.error("updateVariates error: ", error);
      }
    };
  },

  selectJsonObservation(codeJson?: number): IThunkAction {
    return async (dispatch: IAppDispatch): Promise<void> => {
      try {
        const result = await new DictionaryDefaultRegisterFieldsApiRequest().getObservationJsonFields(codeJson);
        if (result.isError) {
          throw result;
        }
        dispatch(FilterConstructorAction.getJsonObservation.done({ result: result.result }));
      } catch (error) {
        console.error("selectFieldBizObj error: ", error);
      }
    };
  },
  // selectJsonRule(codeJson: string): IThunkAction {
  //   return async (dispatch: IAppDispatch): Promise<void> => {
  //     try {
  //       const result = await new RegisterControlListApiRequest().getDictionaryValues(
  //         codeJson
  //       );
  //       if (result.isError) {
  //         throw result;
  //       }
  //       dispatch(FilterConstructorAction.getJsonRule.done({ result: result.result }));
  //     } catch (error) {
  //       console.error("selectFieldBizObj error: ", error);
  //     }
  //   };
  // },

  selectFieldBizObj(type: IFilterType["type"], bizObjId: number, elemId?: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        switch (type) {
          case "criterion": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorSelectFieldBizObj(
                  getState().filterReducer.conditions,
                  getState().filterReducer.selects.comparison,
                  getState().filterReducer.selects.bizObjWithFields,
                  bizObjId,
                  elemId
                )
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "additionalCriterion": {
            dispatch(
              FilterConstructorAction.infoAdditionalSettings(
                constructorSelectFieldBizObj(
                  getState().filterReducer.additionalConditions,
                  getState().filterReducer.selects.comparison,
                  getState().filterReducer.selects.bizObjWithFields,
                  bizObjId,
                  elemId
                )
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "filterCheckList": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorSelectFieldBizObj(
                  getState().filterReducer.conditions,
                  getState().filterReducer.selects.comparison,
                  getState().filterReducer.selects.bizObjWithFields,
                  bizObjId,
                  elemId
                )
              )
            );
            dispatch(RegisterSettingsCheckListAction.updateDisabledSave(true));
            break;
          }
          default: {
            console.log("Error: Неизвестный тип action");
          }
        }
      } catch (error) {
        console.error("selectFieldBizObj error: ", error);
      }
    };
  },

  selectFieldName(type: IFilterType["type"], fieldId: number, elemId?: number, jsonValue?: any): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        switch (type) {
          case "criterion": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorSelectFieldName(
                  getState().filterReducer.conditions,
                  getState().filterReducer.selects.comparison,
                  getState().filterReducer.selects.bizObjWithFields,
                  fieldId,
                  elemId
                )
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "additionalCriterion": {
            dispatch(
              FilterConstructorAction.infoAdditionalSettings(
                constructorSelectFieldName(
                  getState().filterReducer.additionalConditions,
                  getState().filterReducer.selects.comparison,
                  getState().filterReducer.selects.bizObjWithFields,
                  fieldId,
                  elemId
                )
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "filterCheckList": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorSelectFieldName(
                  getState().filterReducer.conditions,
                  getState().filterReducer.selects.comparison,
                  getState().filterReducer.selects.bizObjWithFields,
                  fieldId,
                  elemId,
                  jsonValue
                  // getState().filterReducer.jsonObservation
                )
              )
            );
            dispatch(RegisterSettingsCheckListAction.updateDisabledSave(true));
            break;
          }
          default: {
            console.log("Error: Неизвестный тип action");
          }
        }
      } catch (error) {
        console.error("selectFieldName error: ", error);
      }
    };
  },

  selectFieldType(type: IFilterType["type"], comparisonVal: string | number, elemId?: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        switch (type) {
          case "criterion": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorSelectFieldType(getState().filterReducer.conditions, comparisonVal, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "additionalCriterion": {
            dispatch(
              FilterConstructorAction.infoAdditionalSettings(
                constructorSelectFieldType(getState().filterReducer.additionalConditions, comparisonVal, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "filterCheckList": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorSelectFieldType(getState().filterReducer.conditions, comparisonVal, elemId)
              )
            );
            dispatch(RegisterSettingsCheckListAction.updateDisabledSave(true));
            break;
          }
          default: {
            console.log("Error: Неизвестный тип action");
          }
        }
      } catch (error) {
        console.error("selectFieldType error: ", error);
      }
    };
  },

  writeFieldMultiValue(type: IFilterType["type"], value: IFilter["values"], elemId?: number): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        switch (type) {
          case "criterion": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorWriteFieldMultiValue(getState().filterReducer.conditions, value, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "additionalCriterion": {
            dispatch(
              FilterConstructorAction.infoAdditionalSettings(
                constructorWriteFieldMultiValue(getState().filterReducer.additionalConditions, value, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "filterCheckList": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorWriteFieldMultiValue(getState().filterReducer.conditions, value, elemId)
              )
            );
            dispatch(RegisterSettingsCheckListAction.updateDisabledSave(true));
            break;
          }
          default: {
            console.log("Error: Неизвестный тип action");
          }
        }
      } catch (error) {
        console.error("writeFieldMultiValue error: ", error);
      }
    };
  },

  deleteElement(elemId: number, type: IFilterType["type"]): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        switch (type) {
          case "criterion": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorDeleteElement(getState().filterReducer.conditions, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "additionalCriterion": {
            dispatch(
              FilterConstructorAction.infoAdditionalSettings(
                constructorDeleteElement(getState().filterReducer.additionalConditions, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "filterCheckList": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorDeleteElement(getState().filterReducer.conditions, elemId)
              )
            );
            dispatch(RegisterSettingsCheckListAction.updateDisabledSave(true));
            break;
          }
          default: {
            console.log("Error: Неизвестный тип action");
          }
        }
      } catch (error) {
        console.error("deleteElement error: ", error);
      }
    };
  },

  addElement(parentId: number, type: IFilterType["type"]): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        switch (type) {
          case "criterion": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorAddElement(
                  getState().filterReducer.conditions,
                  getState().filterReducer.selects.comparison,
                  getState().filterReducer.selects.bizObjWithFields,
                  parentId,
                  type
                )
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "additionalCriterion": {
            dispatch(
              FilterConstructorAction.infoAdditionalSettings(
                constructorAddElement(
                  getState().filterReducer.additionalConditions,
                  getState().filterReducer.selects.comparison,
                  getState().filterReducer.selects.bizObjWithFields,
                  parentId,
                  type
                )
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "filterCheckList": {
            dispatch(
              FilterConstructorAction.infoSettings(
                constructorAddElement(
                  getState().filterReducer.conditions,
                  getState().filterReducer.selects.comparison,
                  getState().filterReducer.selects.bizObjWithFields,
                  parentId,
                  type
                )
              )
            );
            dispatch(RegisterSettingsCheckListAction.updateDisabledSave(true));
            break;
          }
          default: {
            console.log("Error: Неизвестный тип action");
          }
        }
      } catch (error) {
        console.error("addElement error: ", error);
      }
    };
  },

  dinamicAddElement(
    parentId: number,
    type: IFilterType["type"],
    fillingRule: string,
    id: number,
    idJson: number
  ): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        dispatch(
          FilterConstructorAction.infoSettings(
            await customConstructorAddElement(
              getState().filterReducer.conditions,
              getState().filterReducer.selects.comparison,
              getState().filterReducer.selects.bizObjWithFields,
              parentId,
              fillingRule,
              id,
              idJson,
              type
            )
          )
        );
      } catch (error) {
        console.error("addElement error: ", error);
      }
    };
  },

  moveRight(elemId: number, type: IFilterType["type"]): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        switch (type) {
          case "criterion": {
            dispatch(
              FilterConstructorAction.infoSettings(constructorMoveRight(getState().filterReducer.conditions, elemId))
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "additionalCriterion": {
            dispatch(
              FilterConstructorAction.infoAdditionalSettings(
                constructorMoveRight(getState().filterReducer.additionalConditions, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "filterCheckList": {
            dispatch(
              FilterConstructorAction.infoSettings(constructorMoveRight(getState().filterReducer.conditions, elemId))
            );
            dispatch(RegisterSettingsCheckListAction.updateDisabledSave(true));
            break;
          }
          default: {
            console.log("Error: Неизвестный тип action");
          }
        }
      } catch (error) {
        console.error("moveRight error: ", error);
      }
    };
  },

  moveLeft(elemId: number, type: IFilterType["type"]): IThunkAction {
    return async (dispatch: IAppDispatch, getState: () => IAppState): Promise<void> => {
      try {
        switch (type) {
          case "criterion": {
            dispatch(
              FilterConstructorAction.infoSettings(constructorMoveLeft(getState().filterReducer.conditions, elemId))
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "additionalCriterion": {
            dispatch(
              FilterConstructorAction.infoAdditionalSettings(
                constructorMoveLeft(getState().filterReducer.additionalConditions, elemId)
              )
            );
            dispatch(ProposalCriterionAction.clearTestCriterion());
            break;
          }
          case "filterCheckList": {
            dispatch(
              FilterConstructorAction.infoSettings(constructorMoveLeft(getState().filterReducer.conditions, elemId))
            );
            dispatch(RegisterSettingsCheckListAction.updateDisabledSave(true));
            break;
          }
          default: {
            console.log("Error: Неизвестный тип action");
          }
        }
      } catch (error) {
        console.error("moveLeft error: ", error);
      }
    };
  },
};

export const replaceConditionOperator = (parentId: number, data: IFilter[]) => {
  const elem = data.filter((item) => item.parentId === parentId);
  return elem.length > 0
    ? data.map((item) => (item.id === elem[0].id ? { ...item, condition: ConditionOperatorEnum.None } : { ...item }))
    : data;
};

export const clearEmptyParent = (data: IFilter[], parentId?: number): IFilter[] => {
  if (parentId) {
    if (data.find((item) => item.parentId === parentId)) {
      return data;
    } else {
      return clearEmptyParent(
        data.filter((item) => item.position !== parentId),
        data.find((item) => item.position === parentId)?.parentId
      );
    }
  }

  return data;
};
