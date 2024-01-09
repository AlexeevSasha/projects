import React from "react";
import { IFromOrToStateForForm } from "../../../../../../common/interfaces/IPompState";
import { Control, DeepMap, FieldError, useController } from "react-hook-form";
import { SelectCustomAsync } from "../../../../../../common/ui/Select/SelectCustomAsync";
import { DictionaryClinrecPompApiRequest } from "../../../../../../api/dictionaryClinrecPompApiRequest";
import styled from "styled-components";
import { FlexContainer } from "../../../../../../common/ui/FlexContainer";
import { Input } from "../../../../../../common/ui/Input/Input";
import { CustomSelect } from "../../../../../../common/ui/Select/CustomSelect";
import { IFormDictionaryState } from "./ModalDictionaryPompState";
import { theme } from "../../../../../../common/styles/theme";
import { useSelector } from "react-redux";
import { dictionaryClinrecPompSelector } from "../../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";

interface IProps {
  disabled: boolean;
  item: IFromOrToStateForForm;
  index: number;
  formKeyName: "fromState" | "toState";
  control?: Control<{ fromState: IFromOrToStateForForm[]; toState: IFromOrToStateForForm[] }>;
  graphId: number;
  errors: DeepMap<IFormDictionaryState, FieldError>;
  watchObj: IFromOrToStateForForm;
}

export const FromOrToStateField = ({
  item,
  control,
  index,
  disabled,
  formKeyName,
  graphId,
  errors,
  watchObj,
}: IProps) => {
  const { listTimeoutUnit } = useSelector(dictionaryClinrecPompSelector);

  const { field: associatedStateIdSelect } = useController({
    control,
    name: `${formKeyName}.${index}.associatedStateIdSelect`,
    defaultValue: item.associatedStateIdSelect || "",
    rules: {
      required: "Обязательное поле",
    },
  });
  const { field: timeout } = useController({
    control,
    name: `${formKeyName}.${index}.timeout`,
    defaultValue: item.timeout || "",
    rules: {
      required: watchObj?.timeoutUnit ? "Необходимо заполнить" : false,
      maxLength: { value: 4, message: "Максимально допустимое число символов: 4" },
      max: { value: 1000, message: "Максимально допустимое значение: 1000" },
      valueAsNumber: true,
    },
  });
  const { field: timeoutUnit } = useController({
    control,
    name: `${formKeyName}.${index}.timeoutUnit`,
    defaultValue: item?.timeoutUnit || "",
    rules: {
      required: timeout.value.length > 0 && "Необходимо заполнить",
    },
  });

  return (
    <CustomStack spacing={6} alignItems={"start"} fullWidth>
      <SelectCustomAsync
        label={"Подэтап"}
        className={"selectWidth"}
        isDisabled={disabled}
        isError={!!errors?.[formKeyName]?.[index]?.associatedStateIdSelect}
        htmlID={"field-dictionary"}
        SelectValue={associatedStateIdSelect.value || ""}
        options={[]}
        closeMenuOnSelect={true}
        isSearchable={true}
        onChange={(value) => {
          associatedStateIdSelect.onChange(value);
          timeoutUnit.onChange("");
          timeout.onChange("");
        }}
        isRelative={true}
        withPaginateApiCallback={async (params) => {
          return new DictionaryClinrecPompApiRequest()
            .getDictionaryPaginateState({ ...params, graphId })
            .then((r) => r.result.items);
        }}
        // @ts-ignore
        errorMsg={errors?.[formKeyName]?.[index]?.associatedStateIdSelect?.message}
      />

      <FlexContainer direction={"row"} justify={"space-between"} fullWidth>
        <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
          <Input
            styleContainer={{ marginTop: 10 }}
            label={`Срок перехода ${
              formKeyName === "fromState" ? "с предществующего подэтапа" : "на следующий подэтап"
            }`}
            fullWidth
            disabled={disabled}
            onChange={(event) => {
              const reg = new RegExp(/^[\d ]{0,1000}$/);
              reg.test(event.currentTarget.value)
                ? timeout.onChange(event.currentTarget.value)
                : timeout.onChange(event.currentTarget.value.slice(0, -1));
            }}
            value={timeout.value}
            error={!!errors?.[formKeyName]?.[index]?.timeout}
            errorMsg={errors?.[formKeyName]?.[index]?.timeout?.message}
          />
        </FlexContainer>
        <FlexContainer alignItems={"start"} style={{ width: "45%" }}>
          <CustomSelect
            label={"Единица измерения перехода"}
            className={"selectWidth"}
            htmlID={"select_timeoutUnit"}
            isDisabled={disabled}
            SelectValue={listTimeoutUnit.find((value) => Number(value.value) === timeoutUnit.value) || ""}
            onChange={(value) => timeoutUnit.onChange(value.value)}
            options={listTimeoutUnit}
            isError={!!errors?.[formKeyName]?.[index]?.timeoutUnit}
            errorMsg={errors?.[formKeyName]?.[index]?.timeoutUnit?.message}
          />
        </FlexContainer>
      </FlexContainer>
    </CustomStack>
  );
};

const CustomStack = styled(FlexContainer)`
  .selectWidth {
    width: 100%;
  }

  border: 1px solid ${theme.colors.lightGray};
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
`;
