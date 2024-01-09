import { IFilterType } from "module/filter/IFilterType.g";
import React, { FC, useMemo } from "react";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import { IFilter } from "../../../../../common/interfaces/IFilter";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectFilterSelects } from "../../../../../module/filter/filterConstructorSelector";
import { selectControlListFields } from "../../../../../module/registerCheckList/registerCheckListSelector";
import { InputField } from "../../../../../common/ui/Input/InputField/InputField";
import { RegisterApiRequest } from "../../../../../api/registerApiRequest";
import { InputMultiField } from "../../../../../common/ui/Input/InputField/InputMultiField";
import { ComparisonValueTypeEnum } from "../../../../../common/interfaces/ComparisonValueTypeEnum.g";
import { ICustomSelect } from "../../../../../common/interfaces/ISelect";
import { FieldRangeInput } from "./FieldRangeInput";
import { RegisterFieldTypeEnum } from "../../../../../common/interfaces/RegisterFieldTypeEnum";
import { ComparisonOperatorEnum } from "../../../../../common/interfaces/ComparisonOperatorEnum";
import { SelectCustomAsync } from "../../../../../common/ui/Select/SelectCustomAsync";
import { IconContainerFloatingmes } from "../../../../../common/components/Table/UIcomponent/UIcomponent";
import { IconCross } from "../../../../../common/components/Icon/IconCross";

interface IProps {
  disable?: boolean;
  type: IFilterType["type"];
  index: number;
  error?: any;
  currentField: {
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
  };
  onChangeValue: (
    bizId: number,
    fieldId: number,
    values: IFilter["values"],
    comparison?: ComparisonOperatorEnum | string
  ) => void;
  onChangeComparison: (bizId: number, fieldId: number, comparison: ComparisonOperatorEnum | string) => void;
}

export const FilterFormItem: FC<IProps> = ({ disable, error, currentField, onChangeValue, onChangeComparison }) => {
  const { bizObjWithFields } = useSelector(selectFilterSelects);
  const { controlListFields } = useSelector(selectControlListFields);

  const filteredControlListFields = new Set(
    controlListFields.fields.filter((item) => item.isVisible).map((item) => item.id)
  );
  const fieldOptions = bizObjWithFields
    .find((item) => item.id === currentField.bizId)
    ?.fields.filter((item) => filteredControlListFields.has(item.id))
    .map((item) => ({ ...item, value: item.id, label: item.description }));

  const selectValueFromDictionary = (id: number) => async (value: ICustomSelect | ICustomSelect[]) => {
    if (Array.isArray(value)) {
      onChangeValue(
        currentField.bizId,
        currentField.id,
        // @ts-ignore
        value?.map((item, index) => ({ ...item, displayValue: item.label, position: index, value })),
        currentField.comparisonValue
      );
    } else {
      // @ts-ignore
      onChangeValue(
        currentField.bizId,
        currentField.id,
        [{ value: String(value.value), displayValue: value.label, position: 0 }],
        currentField.comparisonValue
      );
    }
  };

  const writeFieldValue = (value: string) => {
    onChangeValue(
      currentField.bizId,
      currentField.id,
      [{ value, displayValue: value, position: 0 }],
      currentField.comparisonValue
    );
  };

  const writeFieldMultiValue = (value: IFilter["values"], id?: number) => {
    onChangeValue(currentField.bizId, currentField.id, value, currentField.comparisonValue);
  };

  const input = useMemo(() => {
    if (currentField?.hasDictionaryValues && currentField.comparisonValue) {
      return (
        <ContainerSelect>
          <SelectCustomAsync
            htmlID={"search-from-dictionary-" + +currentField.id}
            isDisabled={disable}
            SelectValue={
              currentField.comparisons.find((c) => c.operator === currentField.comparisonValue)?.comparisonValueType ===
              ComparisonValueTypeEnum.InfiniteValues
                ? currentField.values.map((item) => ({ ...item, label: item.displayValue }))
                : { ...currentField.values[0], label: currentField.values[0]?.displayValue || "" } || ""
            }
            options={[]}
            closeMenuOnSelect
            isSearchable={true}
            onChange={selectValueFromDictionary(currentField.id)}
            fieldID={String(currentField.id)}
            withPaginateConstructorApiCallback={async (params) =>
              new RegisterApiRequest().methodSearchRegisterDictionaryValue(params).then((r) => r.result.items)
            }
            isMulti={
              currentField.comparisons.find((c) => c.operator === currentField.comparisonValue)?.comparisonValueType ===
              ComparisonValueTypeEnum.InfiniteValues
            }
          />
        </ContainerSelect>
      );
    } else {
      switch (currentField.comparisons.find((c) => c.operator === currentField.comparisonValue)?.comparisonValueType) {
        case ComparisonValueTypeEnum.NoValue:
          return null;
        case ComparisonValueTypeEnum.OneValues:
          return (
            <ContainerInput>
              <InputField
                comparison={currentField.comparisons.find((c) => c.operator === currentField.comparisonValue)?.value}
                type={currentField?.type}
                defaultValue={currentField.values[0]?.value || ""}
                onChange={(value) => writeFieldValue(value)}
                id={currentField.id}
                disabled={disable}
                maxWidth="100%"
              />
            </ContainerInput>
          );
        case ComparisonValueTypeEnum.InfiniteValues:
          return (
            <ContainerInput>
              <InputMultiField
                type={currentField.type}
                value={currentField.values || []}
                onChange={(value) =>
                  writeFieldMultiValue(value?.map((item) => ({ ...item, displayValue: item.value })))
                }
                id={currentField.id}
                disabled={disable}
                maxWidth="100%"
              />
            </ContainerInput>
          );
        case ComparisonValueTypeEnum.TwoValues:
          return (
            <ContainerInput>
              <FieldRangeInput
                type={currentField.type}
                defaultValue={currentField?.values || []}
                onChange={(value) => writeFieldMultiValue(value)}
                id={currentField.id}
                disabled={disable}
              />
            </ContainerInput>
          );
        default:
          return null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentField]);

  return (
    <Block id={"element_" + currentField.id}>
      <Row>
        <Title> {fieldOptions?.find((item) => item.id === currentField.id)?.label || ""}</Title>
        <SmallContainerSelect id={"select_comparisonValue" + currentField.id}>
          <CustomSelect
            isError={!!error?.comparisonValue}
            placeholder={!currentField.comparisons?.length ? "Нет доступных операторов" : ""}
            className={"smallSelect"}
            htmlID={"select_comparisonValue"}
            id={currentField.id}
            SelectValue={
              currentField.comparisons?.find(
                (item) =>
                  item?.value ===
                  currentField.comparisons.find((c) => c.operator === currentField.comparisonValue)?.value
              ) || ""
            }
            options={currentField.comparisons}
            onChange={(value) => {
              onChangeComparison(currentField.bizId, currentField.id, value.operator);
            }}
          />
        </SmallContainerSelect>
        <InputContainer>{input}</InputContainer>
        <IconContainerFloatingmes
          title={"Очистить"}
          position={"left"}
          onClick={() => {
            onChangeComparison(currentField.bizId, currentField.id, "");
          }}
        >
          <IconCross />
        </IconContainerFloatingmes>
      </Row>
    </Block>
  );
};

const Block = styled.div`
  margin-bottom: 15px;

  .select {
    margin: 0 10px;
  }
`;

const ContainerSelect = styled.div`
  width: 50%;

  &:first-child {
    width: 100%;
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
  justify-content: start;
`;

const ContainerInput = styled.div`
  padding: 0 10px;
`;

const Title = styled.div`
  width: 15%;
`;
const InputContainer = styled.div`
  width: 62%;
`;
