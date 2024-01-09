import React, { FC, useMemo } from "react";
import { styled } from "../../../../../../common/styles/styled";
import {
  IRegisterFilterFieldsFilterGroup,
  IRegisterFilterFieldsFilterGroupItem,
} from "../../../../../../common/interfaces/register/IRegisterFilterFields";
import { Control, useController } from "react-hook-form";
import { ICustomSelect } from "../../../../../../common/interfaces/ISelect";
import { ComparisonValueTypeEnum } from "../../../../../../common/interfaces/ComparisonValueTypeEnum.g";
import { InputField } from "../../../../../../common/ui/Input/InputField/InputField";
import { RegisterApiRequest } from "../../../../../../api/registerApiRequest";
import { FieldRangeInput } from "../../FilterDrawer/FieldRangeInput";
import { InputMultiField } from "../../../../../../common/ui/Input/InputField/InputMultiField";
import { useSelector } from "react-redux";
import { selectFilterSelects } from "../../../../../../module/filter/filterConstructorSelector";
import { SelectCustomAsync } from "../../../../../../common/ui/Select/SelectCustomAsync";

interface IProps {
  field: IRegisterFilterFieldsFilterGroup;
  parentIndex: number;
  item: IRegisterFilterFieldsFilterGroupItem;
  index: number;
  control: Control<{ filterGroups: IRegisterFilterFieldsFilterGroup[] }>;
}

export const FieldItem: FC<IProps> = ({ item, control, index, parentIndex }: IProps) => {
  const select = useSelector(selectFilterSelects);
  const currentComparison = select.comparison.find((f) => f.operator === item.comparison);

  const { field: currentItem } = useController({
    control,
    name: `filterGroups.${parentIndex}.items.${index}`,
    defaultValue: item,
  });

  const { field: values } = useController({
    control,
    name: `filterGroups.${parentIndex}.items.${index}.values`,
    defaultValue: item?.values,
  });

  const selectValueFromDictionary = () => async (value: ICustomSelect | ICustomSelect[]) => {
    if (Array.isArray(value)) {
      values.onChange(value?.map((item, index) => ({ ...item, displayValue: item.label, position: index })));
    } else values.onChange([{ ...value, displayValue: value.label, position: 0 }]);
  };

  const input = useMemo(() => {
    if (currentItem.value.hasDictionaryValues && currentComparison?.useDictionaryValues) {
      return (
        <ContainerSelect>
          <SelectCustomAsync
            htmlID={"search-from-dictionary-" + currentItem.value.fieldName}
            SelectValue={
              currentComparison?.comparisonValueType === ComparisonValueTypeEnum.InfiniteValues
                ? values?.value?.map((item: any) => ({ ...item, label: item?.displayValue }))
                : [{ ...values.value[0], label: values.value[0]?.displayValue }]
            }
            options={[]}
            closeMenuOnSelect
            isSearchable={true}
            onChange={selectValueFromDictionary()}
            fieldID={String(currentItem.value.idRfdd)}
            withPaginateConstructorApiCallback={async (params) =>
              new RegisterApiRequest().methodSearchRegisterDictionaryValue(params).then((r) => r.result.items)
            }
            isMulti={currentComparison?.comparisonValueType === ComparisonValueTypeEnum.InfiniteValues}
          />
        </ContainerSelect>
      );
    } else {
      switch (currentComparison?.comparisonValueType) {
        case ComparisonValueTypeEnum.NoValue:
          return null;
        case ComparisonValueTypeEnum.OneValues:
          return (
            <>
              <InputField
                comparison={currentComparison.operator}
                type={currentItem.value.rfddType}
                defaultValue={values?.value?.length > 0 ? values.value[0].value : ""}
                onChange={(value) => values.onChange([{ position: 0, value, displayValue: value }])}
                id={currentItem.value.idRfdd}
                maxWidth="100%"
              />
            </>
          );
        case ComparisonValueTypeEnum.InfiniteValues:
          return (
            <>
              <InputMultiField
                type={currentItem.value.rfddType}
                value={values?.value || []}
                onChange={(value) => values.onChange(value?.map((item) => ({ ...item, displayValue: item.value })))}
                id={currentItem.value.idRfdd}
                maxWidth="100%"
              />
            </>
          );
        case ComparisonValueTypeEnum.TwoValues:
          return (
            <>
              <FieldRangeInput
                type={currentItem.value.rfddType}
                defaultValue={values?.value || []}
                onChange={(value) => values.onChange(value)}
                id={currentItem.value.idRfdd}
              />
            </>
          );
        default:
          return null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem.value, currentComparison, values]);

  return (
    <SubForm>
      <FormRow>
        <Label>{currentItem.value.fieldName}</Label>
        {input}
      </FormRow>
    </SubForm>
  );
};

const SubForm = styled.div`
  display: flex;
`;
const FormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ContainerSelect = styled.div`
  width: 100%;

  &:first-child {
    width: 100%;
    padding: 0;
  }
`;

const Label = styled.label`
  align-self: center;
  width: 25%;
`;
