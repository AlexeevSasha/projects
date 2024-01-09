import { ComparisonValueTypeEnum } from "common/interfaces/ComparisonValueTypeEnum.g";
import { IFilterType } from "module/filter/IFilterType.g";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBizObjWithFields } from "../../../../common/interfaces/IBizObjWithFields";
import { IFilterComparisonOperator } from "../../../../common/interfaces/IFilterComparisonOperator";
import { IFilter } from "../../../../common/interfaces/IFilter";
import { styled } from "../../../../common/styles/styled";
import { FilterConstructorThunk } from "../../../../module/filter/filterConstructorThunk";
import { InputField } from "../../../../common/ui/Input/InputField/InputField";
import { ICustomSelect } from "../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../common/ui/Select/CustomSelect";
import { InputMultiField } from "../../../../common/ui/Input/InputField/InputMultiField";
import { RegisterApiRequest } from "../../../../api/registerApiRequest";
import { FilterConstructorAction } from "../../../../module/filter/filterConstructorAction";
import { ComparisonOperatorEnum } from "../../../../common/interfaces/ComparisonOperatorEnum";
import { RegisterControlListApiRequest } from "../../../../api/registerControlListApiRequest";
import { DictionaryDefaultRegisterFieldsApiRequest } from "../../../../api/dictionaryDefaultRegisterFieldsApiRequest";
import { IObservationJsonFields } from "../../../../common/interfaces/IObservationJsonFields";
import { selectJsonObservation } from "../../../../module/filter/filterConstructorSelector";
import { RegisterFieldTypeEnum } from "../../../../common/interfaces/RegisterFieldTypeEnum";
import { FieldRangeInput } from "./FilterDrawer/FieldRangeInput";
import { InputRangeField } from "../../../../common/ui/Input/InputField/InputRangeField";
import { SelectCustomAsync } from "../../../../common/ui/Select/SelectCustomAsync";

interface IProps {
  item: IFilter;
  disabled?: boolean;
  selects: { comparison: IFilterComparisonOperator[]; bizObjWithFields: IBizObjWithFields[] };
  type: IFilterType["type"];
  index?: number;
}

type CustomSelectType = ICustomSelect & { fillingRule?: string };

export interface IFilterSelectOptions extends ICustomSelect {
  useDictionaryValues?: boolean;
  query?: string;
  parentId?: null;
  jsonType?: string;
  fieldName?: string;
  observationCode?: number;
  id?: number;
  description?: string;
  type?: ComparisonValueTypeEnum;
  hasDictionaryValues?: boolean;
  valuesDictionary?: string;
}

export const ConstructorFilterItem: FC<IProps> = ({ item, disabled, selects, type, index }) => {
  const dispatch = useDispatch();
  const jsonObservation2 = useSelector(selectJsonObservation);

  const [jsonObservation, setJsonObservation] = useState<IObservationJsonFields[]>([]);
  const [emptyValue, setEmptyValue] = useState(true);
  const [field, setField] = useState<ICustomSelect[]>([] as ICustomSelect[]);
  const [fieldValue, setFieldValue] = useState<ICustomSelect>({} as ICustomSelect);
  const [bizObj, setBizObj] = useState<ICustomSelect[]>([] as ICustomSelect[]);
  const [bizObjValue, setBizObjValue] = useState<ICustomSelect>({} as ICustomSelect);
  const [comparison, setComparison] = useState<ICustomSelect[]>([] as ICustomSelect[]);
  const [comparisonValue, setComparisonValue] = useState<ICustomSelect>({} as ICustomSelect);
  const [json, setJson] = useState<IFilterSelectOptions[]>([] as IFilterSelectOptions[]);
  const [jsonValue, setJsonValue] = useState<IFilterSelectOptions>({} as IFilterSelectOptions);
  const [inputType, setInputType] = useState<any>();

  useEffect(() => {
    if (item.value || item?.values?.find((item) => item.position === 0)?.value) {
      setEmptyValue(false);
    } else setEmptyValue(true);
  }, [item]);

  useEffect(() => {
    setBizObj(
      selects.bizObjWithFields.map((field) => {
        return { ...field, value: field.id.toString(), label: field.name };
      })
    );

    setBizObjValue({
      label: selects.bizObjWithFields.filter((field) => field.id === item.fieldBizObjId)[0].name,
      value: item.fieldBizObjId.toString(),
    });

    if (item.jsonRuleId) {
      const mainObservation = item.jsonParentId ? jsonObservation : jsonObservation2;

      const options = mainObservation.find((el) => el.id === item.jsonRuleId);

      setJson(
        // @ts-ignore
        mainObservation.filter((el) => el.description).map((el) => ({ ...el, value: el.id, label: el.description }))
      );

      setJsonValue({
        label: options?.description || "",
        value: options?.id || "",
        hasDictionaryValues: options?.hasDictionaryValues,
        valuesDictionary: options?.valuesDictionary,
      });

      setComparison(
        selects.comparison.map((comparison) =>
          comparison?.availableTypes.filter((availableType) => options?.type === availableType).length !== 0
            ? {
                value: comparison.operator.toString(),
                label: comparison.display,
                type: comparison.comparisonValueType,
              }
            : ({} as any)
        )
      );

      setInputType(options?.type || "");
    } else {
      setComparison(
        selects.comparison.map((comparison) =>
          comparison?.availableTypes.filter(
            (availableType) =>
              selects.bizObjWithFields
                .filter((field) => field.id === item.fieldBizObjId)[0]
                .fields.filter((field) => field.id === item.fieldId)[0].type === availableType
          ).length !== 0
            ? {
                value: comparison.operator.toString(),
                label: comparison.display,
                type: comparison.comparisonValueType,
              }
            : ({} as any)
        )
      );

      setInputType(
        selects.bizObjWithFields
          .filter((field) => field.id === item.fieldBizObjId)[0]
          .fields.filter((propertyName) => item.fieldId === propertyName.id)[0]
          ? selects.bizObjWithFields
              .filter((field) => field.id === item.fieldBizObjId)[0]
              .fields.filter((propertyName) => item.fieldId === propertyName.id)[0].type
          : ""
      );
    }

    //  подставыление опшинов
    if (!item.jsonRuleId) {
      setField(
        selects.bizObjWithFields
          .filter((field) => field.id === item.fieldBizObjId)[0]
          .fields.filter((item) => item.type !== RegisterFieldTypeEnum.Json)
          .map((field) => {
            return {
              value: field.id.toString(),
              label: field.description,
              hasDictionaryValues: field.hasDictionaryValues,
            };
          })
      );
    } else {
      setField(
        selects.bizObjWithFields
          .filter((field) => field.id === item.fieldBizObjId)[0]
          .fields.map((field) => {
            return {
              value: field.id.toString(),
              label: field.description,
              hasDictionaryValues: field.hasDictionaryValues,
            };
          })
      );
    }

    setFieldValue({
      label:
        selects.bizObjWithFields
          .find((field) => field.id === item.fieldBizObjId)
          ?.fields.find((field) => field.id === item.fieldId)?.description || "",
      value: item.fieldId.toString() || "",
      hasDictionaryValues: selects.bizObjWithFields
        .find((field) => field.id === item.fieldBizObjId)
        ?.fields.find((field) => field.id === item.fieldId)?.hasDictionaryValues,
    });

    if (selects.comparison.filter((comparison) => comparison.operator === item.comparison).length > 0) {
      setComparisonValue({
        label: selects.comparison.filter((comparison) => comparison.operator === item.comparison)[0].display,
        value: item.comparison,
        type: selects.comparison.filter((comparison) => comparison.operator === item.comparison)[0].comparisonValueType,
        useDictionaryValues: selects.comparison.filter((comparison) => comparison.operator === item.comparison)[0]
          .useDictionaryValues,
      });
    }
  }, [item, selects, jsonObservation, jsonObservation2]);
  const getJsonObservation = async (id: number) => {
    try {
      const result = await new DictionaryDefaultRegisterFieldsApiRequest().getObservationJsonFields(id);
      if (result.isError) {
        throw result;
      }
      setJsonObservation(result.result);
    } catch (error) {
      console.error("selectFieldBizObj error: ", error);
    }
  };

  useEffect(() => {
    if (item.jsonParentId) {
      getJsonObservation(item.jsonParentId);
    }
    // eslint-disabled-next-line react-hooks/exhaustive-deps
  }, [item.jsonParentId]);

  const selectFieldName = (value: IFilterSelectOptions, id?: number) => {
    dispatch(FilterConstructorThunk.selectFieldName(type, +value.value, id, value));
  };

  const selectFieldType = (value: IFilterSelectOptions, id?: number) => {
    dispatch(FilterConstructorThunk.selectFieldType(type, value.value, id));
  };

  const writeFieldValue = (value: string, id?: number) => {
    dispatch(FilterConstructorThunk.writeFieldMultiValue(type, [{ position: 0, value }], id));
  };

  const writeFieldMultiValue = (value: IFilter["values"], id?: number) => {
    dispatch(FilterConstructorThunk.writeFieldMultiValue(type, value, id));
  };

  const selectValueFromDictionary = (id: number) => async (value: CustomSelectType | CustomSelectType[]) => {
    dispatch(
      FilterConstructorThunk.writeFieldMultiValue(
        type,
        Array.isArray(value)
          ? value.map((item, index) => {
              return {
                position: index,
                value: item.value.toString(),
                displayValue: item.label,
              };
            })
          : [{ position: 0, value: value.value.toString(), displayValue: value.label }],
        id
      )
    );
    if (!Array.isArray(value) && value.fillingRule && comparisonValue.value === ComparisonOperatorEnum.Equal) {
      dispatch(FilterConstructorThunk.dinamicAddElement(0, type, value.fillingRule, id, +value.value));
      value.fillingRule === "json" && dispatch(FilterConstructorThunk.selectJsonObservation(Number(value.value)));
    }
  };

  const selectFieldBizObj = (value: IFilterSelectOptions, id?: number) => {
    const indx = typeof index !== "undefined" ? index : 0;
    dispatch(FilterConstructorAction.clearConditionsValue({ pos: indx, type: type, filterLevel: item.filterLevel }));
    dispatch(FilterConstructorThunk.selectFieldBizObj(type, +value.value, id));
  };

  const input = useMemo(() => {
    if (fieldValue?.hasDictionaryValues && comparisonValue.useDictionaryValues) {
      return (
        <ContainerSelect>
          <SelectCustomAsync
            isError={emptyValue}
            htmlID={"search-from-dictionary-" + +item.id}
            isDisabled={disabled}
            SelectValue={
              comparisonValue?.type === ComparisonValueTypeEnum.InfiniteValues
                ? (item.values.map((item) => {
                    return { value: item.value, label: item.displayValue };
                  }) as unknown)
                : { value: item.values[0]?.value, label: item.values[0]?.displayValue }
            }
            options={[]}
            closeMenuOnSelect
            isSearchable={true}
            onChange={selectValueFromDictionary(item.id)}
            fieldID={String(fieldValue.value)}
            withPaginateConstructorApiCallback={async (params) =>
              new RegisterApiRequest().methodSearchRegisterDictionaryValue(params).then((r) => r.result.items)
            }
            isMulti={comparisonValue?.type === ComparisonValueTypeEnum.InfiniteValues}
          />
        </ContainerSelect>
      );
    } else if (jsonValue?.hasDictionaryValues && comparisonValue.useDictionaryValues) {
      return (
        <ContainerSelect>
          <SelectCustomAsync
            isError={emptyValue}
            isDisabled={disabled}
            htmlID={"search-from-dictionary2-" + +item.id}
            SelectValue={
              comparisonValue?.type === ComparisonValueTypeEnum.InfiniteValues
                ? (item.values.map((item) => {
                    return { value: item.value, label: item.displayValue };
                  }) as unknown)
                : { value: item.values[0]?.value, label: item.values[0]?.displayValue }
            }
            options={[]}
            closeMenuOnSelect
            isSearchable={true}
            fieldID={String(jsonValue.valuesDictionary)}
            onChange={selectValueFromDictionary(item.id)}
            withPaginateConstructorDictionary={async (params) =>
              new RegisterControlListApiRequest()
                .getDictionaryValues(String(params?.id), params)
                .then((r) => r.result.items)
            }
            isMulti={comparisonValue?.type === ComparisonValueTypeEnum.InfiniteValues}
          />
        </ContainerSelect>
      );
    } else {
      switch (comparisonValue?.type) {
        case ComparisonValueTypeEnum.NoValue:
          return null;
        case ComparisonValueTypeEnum.OneValues:
          return (
            <ContainerInput>
              <InputField
                comparison={comparisonValue.value}
                error={emptyValue}
                type={inputType}
                defaultValue={item.values?.find((item) => item.position === 0)?.value || ""}
                onChange={writeFieldValue}
                id={item.id}
                disabled={disabled}
                maxWidth="100%"
                step={"1.00"}
              />
            </ContainerInput>
          );
        case ComparisonValueTypeEnum.InfiniteValues:
          return (
            <ContainerInput>
              <InputMultiField
                error={emptyValue}
                type={inputType}
                value={item.values}
                onChange={writeFieldMultiValue}
                id={item.id}
                disabled={disabled}
                maxWidth="100%"
                step={"1.00"}
              />
            </ContainerInput>
          );
        case ComparisonValueTypeEnum.TwoValues:
          return inputType === "DateTime" ? (
            <ContainerInput>
              <FieldRangeInput
                type={inputType}
                defaultValue={item.values}
                onChange={writeFieldMultiValue}
                id={item.id}
                disabled={disabled}
              />
            </ContainerInput>
          ) : (
            <ContainerInput>
              <InputRangeField
                type={inputType}
                defaultValue={item.values}
                onChange={writeFieldMultiValue}
                id={item.id}
                disabled={disabled}
                step={"1.00"}
              />
            </ContainerInput>
          );
        default:
          return null;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comparisonValue, item, fieldValue]);

  return (
    <>
      <Block id={"element_" + item.id}>
        <TopRow>
          {bizObjValue && !item?.jsonRuleId && (
            <ContainerSelect id={"select_fieldBizObj_" + item.id}>
              <CustomSelect
                htmlID={"select_fieldBizObj"}
                id={item.id}
                isSearchable
                SelectValue={bizObjValue as unknown}
                options={bizObj}
                onChange={selectFieldBizObj}
                isDisabled={disabled}
              />
            </ContainerSelect>
          )}

          {fieldValue && !item?.jsonRuleId && (
            <ContainerSelect id={"select_fieldValue_" + item.id}>
              <CustomSelect
                htmlID={"select_fieldValue"}
                id={item.id}
                isSearchable
                SelectValue={fieldValue as unknown}
                options={field}
                onChange={selectFieldName}
                isDisabled={disabled || !!item?.jsonRuleId}
              />
            </ContainerSelect>
          )}

          {item.jsonRuleId && (
            <ContainerSelect id={"select_jsonRule_" + item.id}>
              <CustomSelect
                htmlID={"select_jsonRule"}
                id={item.id}
                isSearchable
                SelectValue={jsonValue as unknown}
                options={json}
                onChange={selectFieldName}
                isDisabled={disabled}
              />
            </ContainerSelect>
          )}
        </TopRow>
        <Row>
          {comparisonValue && (
            <SmallContainerSelect id={"select_comparisonValue_" + item.id}>
              <CustomSelect
                className={"smallSelect"}
                htmlID={"select_comparisonValue"}
                id={item.id}
                SelectValue={comparisonValue as unknown}
                options={comparison.filter((item) => item.label?.length > 0)}
                onChange={selectFieldType}
                isDisabled={disabled}
              />
            </SmallContainerSelect>
          )}

          {input}
        </Row>
      </Block>
    </>
  );
};

const Block = styled.div`
  width: 85%;

  .select {
    margin: 0 10px;
  }
`;

const ContainerSelect = styled.div`
  width: 50%;

  &:first-child {
    width: 50%;
    padding: 0;
  }

  &:nth-child(2) {
    padding: 0 10px;
  }
`;

const SmallContainerSelect = styled.div`
  display: flex;
  width: 20%;

  .smallSelect {
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
  justify-content: space-between;
`;
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
`;

const ContainerInput = styled.div`
  padding: 0 10px;
  width: 80%;
`;
