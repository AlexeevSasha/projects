import React from "react";
import styled from "styled-components";
import { Control, DeepMap, FieldError, useController } from "react-hook-form";
import { Input } from "../../../../../common/ui/Input/Input";
import { useSelector } from "react-redux";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import { IFormDictionaryPomp } from "./ModalDictionaryPomp";

interface IProps {
  control: Control<IFormDictionaryPomp>;
  errors: DeepMap<IFormDictionaryPomp, FieldError>;
}

export const CreatePompBasedOnFields = (props: IProps) => {
  const pompList = useSelector(dictionaryClinrecPompSelector).pompList;

  const { field: BasedOn } = useController({
    control: props.control,
    name: "BasedOn",
    defaultValue: "",
    rules: { required: "Обязательное поле" },
  });
  const { field: basedName } = useController({
    control: props.control,
    name: "basedName",
    defaultValue: "",
    rules: {
      required: "Обязательное поле",
      validate: (value: string) => {
        return value === BasedOn.value?.name ? "Такое название уже существует" : true;
      },
    },
  });

  return (
    <Container>
      <CustomSelect
        label={"Создано на основе"}
        isRequired
        htmlID={"field-dictionary"}
        SelectValue={BasedOn.value || ""}
        options={pompList || []}
        closeMenuOnSelect
        isSearchable={true}
        isRelative={true}
        isError={!!props.errors.BasedOn}
        onChange={(value) => BasedOn.onChange(value)}
        // @ts-ignore
        errorMsg={props.errors.BasedOn?.message}
      />
      <Input
        label={"Название"}
        fullWidth
        name="basedName"
        value={basedName.value}
        onChange={(value) => basedName.onChange(value)}
        error={!!props.errors.basedName}
        maxLength={100}
        errorMsg={props.errors.basedName?.message}
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
