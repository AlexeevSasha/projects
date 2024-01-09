import React, { useEffect } from "react";
import { CheckBox } from "../../../../../common/ui/Input/CheckBox";
import { styled } from "../../../../../common/styles/styled";
import { IamScriptDto, IamScriptParamDto } from "../../../../../common/interfaces/IamScriptDto";
import { Control, DeepMap, FieldError, useController } from "react-hook-form";
import { Input } from "../../../../../common/ui/Input/Input";
import { useSelector } from "react-redux";
import { dictionaryIamScriptSelector } from "../../../../../module/dictionaryIamScript/dictionaryIamScriptSelector";
import { ICustomBaseSelect } from "../../../../../common/interfaces/ISelect";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import { useOptionsSelector } from "../ModalDisplayField/hooks/useOptionsSelector";
import { theme } from "../../../../../common/styles/theme";

interface IProps {
  param: IamScriptParamDto;
  index: number;
  control: Control<{ params: IamScriptParamDto[] }>;
  register: any;
  errors: DeepMap<Pick<IamScriptDto, "id" | "name" | "comment" | "script" | "params">, FieldError>;
  disabled: boolean;
  options: ICustomBaseSelect[];
}

export const ParamField: React.FC<IProps> = ({
  param,
  index,
  control,
  register,
  errors,
  disabled,
  options,
}: IProps) => {
  const { loadingParamTypes } = useSelector(dictionaryIamScriptSelector);
  const { dictionaryProps } = useOptionsSelector();

  const { field: catalog } = useController({
    control,
    name: `params.${index}.catalog`,
    defaultValue: param.catalog || false,
  });
  const { field: type } = useController({
    control,
    name: `params.${index}.type`,
    defaultValue: param?.type,
    rules: { required: "Обязательное поле" },
  });
  const { field: nsiUid } = useController({
    control,
    name: `params.${index}.nsiUid`,
    defaultValue: catalog.value ? dictionaryProps?.find((d) => d.value === param?.nsiUid)?.value || "" : "",
    rules: { required: catalog.value ? "Обязательное поле" : false },
  });

  useEffect(() => {
    if (!catalog.value) {
      nsiUid.onChange("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog.value]);

  return (
    <React.Fragment key={index}>
      <Line>
        <span>Наименование параметра {param.name}:</span>
        <Input
          fullWidth
          error={!!errors.params?.[index]?.description}
          name={`params.${index}.description`}
          ref={register({
            maxLength: { value: 200, message: "Максимально допустимое число символов: 200" },
          })}
          disabled={disabled}
        />
      </Line>

      {errors.params?.[index]?.description?.message && (
        <Line>
          <div />
          <ErrorText>{errors.params?.[index]?.description?.message}</ErrorText>
        </Line>
      )}
      <Line style={{ marginTop: 8 }}>
        <CheckBox
          check={catalog.value}
          onCheck={() => catalog.onChange(!catalog.value)}
          checkId={`params.${index}.catalog`}
          hideMarginLeft
          disabled={disabled}
        >
          Справочник
        </CheckBox>
        <ValueWrapper>
          {catalog.value && (
            <CustomSelect
              isError={!!errors.params?.[index]?.nsiUid}
              isRelative
              htmlID={"list_dictionaries"}
              isSearchable
              SelectValue={catalog.value ? dictionaryProps.find((d) => d.value === nsiUid.value) || "" : ""}
              options={dictionaryProps}
              onChange={(value) => nsiUid.onChange(catalog.value ? value.value : "")}
              isDisabled={disabled}
            />
          )}
        </ValueWrapper>
      </Line>
      {errors.params?.[index]?.nsiUid?.message && (
        <Line>
          <div />
          <ErrorText>{errors.params?.[index]?.nsiUid?.message}</ErrorText>
        </Line>
      )}
      <Line>
        {!catalog.value && (
          <>
            <div>Образец заполнения:</div>
            <Input
              fullWidth
              disabled={disabled}
              error={!!errors.params?.[index]?.exampleValue}
              name={`params.${index}.exampleValue`}
              ref={register({
                maxLength: { value: 200, message: "Максимально допустимое число символов: 200" },
              })}
            />
          </>
        )}
      </Line>
      {errors.params?.[index]?.exampleValue?.message && (
        <Line>
          <div />
          <ErrorText>{errors.params?.[index]?.exampleValue?.message}</ErrorText>
        </Line>
      )}
      <Line style={{ marginTop: 8 }}>
        <div>Тип параметра:</div>
        <CustomSelect
          menuPlacement={"top"}
          isDisabled={disabled}
          isError={!!errors.params?.[index]?.type}
          htmlID={"typeSelect"}
          SelectValue={options.find((v) => v.value === type.value) as unknown}
          options={options}
          isSearchable
          onChange={(v) => type.onChange(v.value)}
          isLoading={loadingParamTypes}
        />
      </Line>
      {errors.params?.[index]?.type?.message && (
        <Line>
          <div />
          <ErrorText>{errors.params?.[index]?.type?.message}</ErrorText>
        </Line>
      )}

      <br />
    </React.Fragment>
  );
};

const Line = styled.div`
  display: grid;
  grid-template: 30px / 1fr 1fr;
  margin-bottom: 8px;
  align-items: center;
`;

const ValueWrapper = styled.div`
  input {
    width: 100%;
  }
`;

const ErrorText = styled.div`
  color: ${theme.colors.lightRed};
`;
