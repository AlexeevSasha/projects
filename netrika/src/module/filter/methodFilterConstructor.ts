import { IBizObjWithFields } from "common/interfaces/IBizObjWithFields";
import { ComparisonOperatorEnum } from "common/interfaces/ComparisonOperatorEnum";
import { ConditionOperatorEnum } from "common/interfaces/ConditionOperatorEnum";
import { IFilterComparisonOperator } from "common/interfaces/IFilterComparisonOperator";
import { IFilter } from "common/interfaces/IFilter";
import { IFilterType } from "./IFilterType.g";
import { IRegisterFieldBase } from "../../common/interfaces/register/IRegisterFieldBase";
import { IObservationJsonFields } from "../../common/interfaces/IObservationJsonFields";
import { DictionaryDefaultRegisterFieldsApiRequest } from "../../api/dictionaryDefaultRegisterFieldsApiRequest";
import { RegisterFieldTypeEnum } from "../../common/interfaces/RegisterFieldTypeEnum";

export const constructorUpdateVariates = (conditions: IFilter[], elemId: number) => {
  return conditions.map((item) =>
    item.id === elemId
      ? {
          ...item,
          condition: item.jsonRuleId
            ? ConditionOperatorEnum.And
            : item.condition === ConditionOperatorEnum.And
            ? ConditionOperatorEnum.Or
            : ConditionOperatorEnum.And,
        }
      : item
  );
};

export const constructorSelectFieldBizObj = (
  conditions: IFilter[],
  comparison: IFilterComparisonOperator[],
  bizObjWithFields: IBizObjWithFields[],
  bizObjId: number,
  elemId?: number
) => {
  return conditions.map((item) => {
    if (item.id === elemId) {
      return {
        ...item,
        fieldBizObjId: bizObjId,
        fieldId: item.jsonRuleId
          ? bizObjWithFields.filter((field) => field.id === bizObjId)[0].fields[0].id
          : bizObjWithFields
              .filter((field) => field.id === bizObjId)[0]
              .fields.filter((f) => f.type !== RegisterFieldTypeEnum.Json)[0].id,
        comparison: item.jsonRuleId
          ? comparison.filter((comparisonItem) => {
              if (
                comparisonItem.availableTypes.filter(
                  (type) => bizObjWithFields.filter((field) => field.id === bizObjId)[0].fields[0].type === type
                ).length !== 0
              ) {
                return { key: comparisonItem.operator.toString(), value: comparisonItem.display };
              } else {
                return undefined;
              }
            })[0].operator
          : comparison.filter((comparisonItem) => {
              if (
                comparisonItem.availableTypes.filter(
                  (type) =>
                    bizObjWithFields
                      .filter((field) => field.id === bizObjId)[0]
                      .fields.filter((f) => f.type !== RegisterFieldTypeEnum.Json)[0].type === type
                ).length !== 0
              ) {
                return { key: comparisonItem.operator.toString(), value: comparisonItem.display };
              } else {
                return undefined;
              }
            })[0].operator,
      };
    } else {
      return { ...item };
    }
  });
};

export const constructorSelectFieldName = (
  conditions: IFilter[],
  comparison: IFilterComparisonOperator[],
  bizObjWithFields: IBizObjWithFields[],
  fieldId: number,
  elemId?: number,
  jsonObservation?: IObservationJsonFields
) => {
  return conditions.map((item) => {
    const options = jsonObservation && item.jsonRuleId ? jsonObservation : undefined;
    return item.id === elemId
      ? {
          ...item,
          fieldId: item.jsonRuleId ? item.fieldId : fieldId,
          jsonRuleId: options?.id,
          jsonQuery: options?.query,
          values: [],
          comparison: comparison.filter((comparisonItem) => {
            if (
              comparisonItem.availableTypes.filter((type) =>
                item.jsonRuleId
                  ? options?.type === type
                  : bizObjWithFields
                      .filter((bizObj) => bizObj.id === item.fieldBizObjId)[0]
                      ?.fields.filter((field) => field.id === fieldId)[0].type === type
              ).length !== 0
            ) {
              return { key: comparisonItem.operator.toString(), value: comparisonItem.display };
            } else {
              return undefined;
            }
          })[0].operator,
        }
      : { ...item };
  });
};

export const constructorSelectFieldType = (conditions: IFilter[], comparisonVal: string | number, elemId?: number) => {
  return conditions.map((item) =>
    item.id === elemId ? { ...item, comparison: ComparisonOperatorEnum[comparisonVal], values: [] } : { ...item }
  );
};

export const constructorWriteFieldMultiValue = (conditions: IFilter[], value: IFilter["values"], elemId?: number) => {
  return conditions.map((item) => (item.id === elemId ? { ...item, values: value } : { ...item }));
};

export const constructorDeleteElement = (conditions: IFilter[], elemId: number) => {
  let parentId = 0;
  let result = conditions.filter((item) => {
    if (item.id === elemId) {
      parentId = item.parentId;
      return false;
    }
    return true;
  });

  result = replaceConditionOperator(result, parentId);
  result = clearEmptyParent(result, parentId);
  return result;
};

export const constructorAddElement = (
  conditions: IFilter[],
  comparison: IFilterComparisonOperator[],
  bizObjWithFields: IBizObjWithFields[],
  parentId: number,
  type: IFilterType["type"]
) => {
  const result = [...conditions];
  const bizObject = bizObjWithFields.find(({ fields }) => fields.length);
  if (bizObject) {
    result.push({
      id: Math.round(Math.random() * 1000000),
      values: [],
      value: "",
      fieldBizObjId: bizObject.id,
      fieldId: bizObject.fields[0].id,
      condition: ConditionOperatorEnum.None,
      comparison: comparison.filter((comparisonItem) =>
        comparisonItem.availableTypes.some((type) => bizObject.fields[0].type === type)
      )[0].operator,
      position: result.length ? result[result.length - 1].position + 1 : 1,
      parentId,
      filterLevel: type === "criterion" ? 0 : 1,
    } as IFilter);
  }

  return result;
};

const fillingRuleCheck = (rule: string, fields: IRegisterFieldBase[]) => {
  const regexp = /\(([^)]+)\)/;
  return fields.find((el) => {
    const check = el.description.match(regexp);
    const value = check ? check[1] : "";
    switch (rule) {
      case "Число":
        return value === "числовое";
      case "Строка":
        return value === "строковое";
      case "Справочник":
        return value === "код справочника";
      case "bool":
        return value === "логическое";
      case "Дата":
        return value === "дата";
      case "json":
        return el.type === "Json";
      default:
        return true;
    }
  })?.id;
};

export const customConstructorAddElement = async (
  conditions: IFilter[],
  comparison: IFilterComparisonOperator[],
  bizObjWithFields: IBizObjWithFields[],
  parentId: number,
  fillingRule: string,
  id: number,
  idJson: number,
  type: IFilterType["type"]
) => {
  const result = [...conditions];
  const bizObject = bizObjWithFields.find(({ id }) => id === 8);
  const jsonObj: { jsonRuleId?: number; jsonQuery?: string; jsonParentId?: number | null } = {};
  if (bizObject) {
    const rule = fillingRuleCheck(fillingRule, bizObject.fields);
    const lastElem = conditions[conditions.length - 1];

    if (fillingRule === "json") {
      const { result } = await new DictionaryDefaultRegisterFieldsApiRequest().getObservationJsonFields(idJson);
      const json = result.filter((el) => el.description);
      jsonObj.jsonRuleId = json[0].id;
      jsonObj.jsonQuery = json[0].query;
      jsonObj.jsonParentId = null;
    }

    if (lastElem.id === id) {
      result.push({
        id: Math.round(Math.random() * 1000000),
        values: [],
        value: "",
        fieldBizObjId: bizObject.id,
        fieldId: rule || bizObject.fields[0].id,
        condition: ConditionOperatorEnum.And,
        comparison: comparison.filter((comparisonItem) =>
          comparisonItem.availableTypes.some(
            (type) => bizObject.fields.filter((f) => f.type !== RegisterFieldTypeEnum.Json)[0].type === type
          )
        )[0].operator,
        position: result.length ? result[result.length - 1].position + 1 : 1,
        parentId,
        filterLevel: type === "criterion" ? 0 : 1,
        ...jsonObj,
      } as IFilter);
    } else {
      const indexCurrentElem = conditions.findIndex((el) => el.id === id);
      if (fillingRule !== "json") {
        delete conditions[indexCurrentElem + 1]?.jsonRuleId;
        delete conditions[indexCurrentElem + 1]?.jsonQuery;
      }
      const changeElem = {
        ...conditions[indexCurrentElem + 1],
        fieldBizObjId: bizObject.id,
        fieldId: rule || bizObject.fields[0].id,
        condition: ConditionOperatorEnum.And,
        comparison: comparison.filter((comparisonItem) =>
          comparisonItem.availableTypes.some(
            (type) => bizObject.fields.filter((f) => f.type !== RegisterFieldTypeEnum.Json)[0].type === type
          )
        )[0].operator,
        ...jsonObj,
      };

      result.splice(indexCurrentElem + 1, 1, changeElem);
    }
  }

  return result;
};

export const constructorMoveRight = (conditions: IFilter[], elemId: number) => {
  // Получает данные элемента, который нужно внести под скобки
  const newElement = conditions.find((item) => item.id === elemId);
  if (newElement) {
    // Присваивает элементу, который нужно внести под скобки статус родительского
    const result = conditions.map((item) =>
      item.id === elemId
        ? {
            ...item,
            comparison: ComparisonOperatorEnum.Parent,
          }
        : { ...item }
    );

    // Добавляет копию элемента, который нужно внести под скобки, как дочерний элементу, который стал родительским на предыдущем шаге

    result.push({
      ...newElement,
      id: Math.round(Math.random() * 3000000),
      parentId: newElement.position,
      condition: ConditionOperatorEnum.None,
      position: conditions[conditions.length - 1].position + 1,
    });
    return result;
  }

  return conditions;
};

export const constructorMoveLeft = (conditions: IFilter[], elemId: number) => {
  // Поиск элемента по id
  const element = conditions.find((item) => item.id === elemId) || ({} as IFilter);
  // Поиск родительского элемента
  const parentElement = conditions.find((item) => item.position === element.parentId);

  let result = conditions.map((item) =>
    item.id === elemId
      ? {
          ...item,
          condition: ConditionOperatorEnum.None,
          parentId: parentElement?.parentId || 0,
        }
      : { ...item }
  );
  result = clearEmptyParent(result, parentElement?.position || 0);
  result = replaceConditionOperator(result, parentElement?.position || 0);

  return result;
};

/** Вспомогательные методы */
const replaceConditionOperator = (data: IFilter[], parentId: number) => {
  const elem = data.filter((item) => item.parentId === parentId);
  return elem.length > 0
    ? data.map((item) => (item.id === elem[0].id ? { ...item, condition: ConditionOperatorEnum.None } : { ...item }))
    : data;
};

const clearEmptyParent = (data: IFilter[], parentId?: number): IFilter[] => {
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
