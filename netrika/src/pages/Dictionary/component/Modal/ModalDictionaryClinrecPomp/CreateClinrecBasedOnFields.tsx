import React from "react";
import styled from "styled-components";
import { Control, DeepMap, FieldError, useController } from "react-hook-form";
import { Input } from "../../../../../common/ui/Input/Input";
import { useSelector } from "react-redux";
import { dictionaryClinrecPompSelector } from "../../../../../module/dictionaryClinrecPomp/dictionaryClinrecPompSelector";
import { CustomSelect } from "../../../../../common/ui/Select/CustomSelect";
import { IFormDictionaryClinrec } from "./ModalDictionaryClinrec";

interface IProps {
  control: Control<IFormDictionaryClinrec>;
  errors: DeepMap<IFormDictionaryClinrec, FieldError>;
}

export const CreateClinrecBasedOnFields = (props: IProps) => {
  const clinrecList = useSelector(dictionaryClinrecPompSelector).clinrecSelects.clinrecList;

  const { field: BasedOn } = useController({
    control: props.control,
    name: "BasedOn",
    defaultValue: "",
    rules: { required: "Обязательное поле" },
  });
  const { field: name } = useController({
    control: props.control,
    name: "name",
    defaultValue: "",
    rules: {
      required: "Обязательное поле",
      validate: (value: string) => {
        return value === BasedOn.value.clinrecName ? "Такое название уже существует" : true;
      },
    },
  });

  return (
    <Container>
      <CustomSelect
        isRequired
        label={"Создано на основе"}
        htmlID={"field-dictionary"}
        SelectValue={BasedOn.value || ""}
        options={clinrecList || []}
        closeMenuOnSelect
        isSearchable={true}
        isRelative={true}
        isError={!!props.errors.BasedOn}
        onChange={(value) => BasedOn.onChange(value)}
        // @ts-ignore
        errorMsg={props.errors?.BasedOn?.message}
      />
      <Input
        isRequired
        id={"clinrec-name"}
        label={"Название"}
        fullWidth
        name="name"
        value={name.value}
        onChange={(value) => name.onChange(value)}
        error={!!props.errors.name}
        maxLength={100}
        errorMsg={props.errors.name?.message}
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
