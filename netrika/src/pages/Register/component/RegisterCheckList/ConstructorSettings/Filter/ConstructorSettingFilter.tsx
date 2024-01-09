import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterCheckListFilterFieldsThunk } from "../../../../../../module/registerCheckListFilterFields/registerCheckListFilterFieldsThunk";
import { filterFieldsListSelector } from "../../../../../../module/registerCheckListFilterFields/registerCheckListFilterFieldsSelector";
import { IconLoading } from "../../../../../../common/components/Icon/IconLoading";
import { InputField } from "../../../../../../common/ui/Input/InputField/InputField";
import { styled } from "../../../../../../common/styles/styled";
import { theme } from "../../../../../../common/styles/theme";
import { useController, useFieldArray, useForm } from "react-hook-form";
import { FormItem } from "./FormItem";
import {
  IRegisterFilterFields,
  IRegisterFilterFieldsFilterGroup,
} from "../../../../../../common/interfaces/register/IRegisterFilterFields";
import { SelectCustomSortable } from "../../../../../../common/ui/Select/SelectCustomSortable";
import { ICustomSelect } from "../../../../../../common/interfaces/ISelect";
import { selectFields } from "../../../../../../module/filter/filterConstructorSelector";
import { css } from "styled-components";
import { FlexContainer } from "../../../../../../common/ui/FlexContainer";
import { LabelStyle } from "../../../../../../common/ui/Input/styles/labelStyles";
import { ModalFooter } from "../../../../../../common/components/Popup/components/ModalFooter";
import { ButtonStyles } from "../../../../../../common/ui/Button/styles/ButtonStyles";

interface IProps {
  onClose: () => void;
  registerId: number;
  isCreate?: boolean;
  isExtendedKs: boolean;
}

export const ConstructorSettingFilter: FC<IProps> = ({ onClose, registerId, isCreate, isExtendedKs }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>("");
  const { filterFields, defaultFilterFields, loadingDefaultFilterFields, errorMessage } = useSelector(
    filterFieldsListSelector
  );
  const fieldOption = useSelector(selectFields);

  const { control, handleSubmit, errors, setValue } = useForm({
    defaultValues: {
      id: isCreate ? 0 : filterFields.id,
      name: isCreate ? "" : filterFields.name,
      description: isCreate ? "" : filterFields.description,
      filterGroups: isCreate ? defaultFilterFields : filterFields.filterGroups,
    },
  });

  const { field: name } = useController({
    control,
    name: "name",
    defaultValue: isCreate ? "" : filterFields.name || "",
    rules: { required: true },
  });
  const { field: searchFields } = useController({
    control,
    name: "searchFields",
    defaultValue: isCreate
      ? []
      : fieldOption?.filter((searchField) => filterFields.searchFields?.find((f) => f === searchField.value)),
  });
  const { fields } = useFieldArray({
    control,
    name: "filterGroups",
  });

  const registerSubmit = (data: IRegisterFilterFields) => {
    if (
      data.filterGroups
        .flatMap((i) => i.items.flatMap((e) => e.values))
        .some((EV) => EV.value !== null && EV.value !== "")
    ) {
      if (isCreate || data.handled) {
        delete data.handled;
        dispatch(
          RegisterCheckListFilterFieldsThunk.createRegisterDefaultFilterFields(
            registerId,
            {
              ...data,
              id: 0,
              description: "",
              isExtendedKs: isExtendedKs,
              //@ts-ignore
              searchFields: data.searchFields.map((i) => i.value),
            },
            onClose
          )
        );
      } else {
        delete data.handled;
        dispatch(
          RegisterCheckListFilterFieldsThunk.updateRegisterDefaultFilterFields(
            registerId,
            filterFields.id,
            {
              ...data,
              id: data.id,
              description: data.name,
              isExtendedKs: isExtendedKs,

              //@ts-ignore
              searchFields: data.searchFields?.map((i) => i.value),
            },
            onClose
          )
        );
      }
      setText("");
    } else {
      setText("Для сохранения необходимо заполнить хотя бы одно поле");
    }
  };

  if (loadingDefaultFilterFields) return <IconLoading />;
  return (
    <CustomForm id={"reg_form"} onSubmit={handleSubmit(registerSubmit)} style={{ width: "100%," }}>
      <MainSettingItem>
        <FlexContainer direction={"row"} justify={"space-between"} style={{ width: "100%" }}>
          <SettingItem width={"calc(25% + 3px)"}>
            <LabelStyle isRequired> Название контрольного списка</LabelStyle>
            <InputField
              altId="input_name_control_list"
              error={!!errors.name}
              type="String"
              defaultValue={name.value}
              onChange={name.onChange}
              placeholder="Введите название"
              maxWidth={"100%"}
              maxLength={200}
            />
          </SettingItem>
          <SettingItem id={"fields"} width={"75%"}>
            <label>Поля списка пациентов</label>

            {!!fieldOption && (
              <SelectCustomSortable
                closeMenuOnSelect={false}
                options={fieldOption}
                htmlID={"commonSetting_fields"}
                isSortableSelect
                isSearchable
                placeholder={"Укажите дополнительные поля"}
                onChange={searchFields.onChange}
                SelectValue={searchFields.value as ICustomSelect[]}
              />
            )}
          </SettingItem>
        </FlexContainer>
        <FormsBlock>
          {fields?.map((field, index) => (
            <FormItem key={index} field={field as IRegisterFilterFieldsFilterGroup} index={index} control={control} />
          ))}
        </FormsBlock>
      </MainSettingItem>
      <ModalFooter>
        <ButtonBlock>
          <Button
            onClick={async () => {
              await setValue(
                "filterGroups",

                []
              );
              setValue(
                "filterGroups",

                isCreate
                  ? defaultFilterFields
                  : filterFields.filterGroups.map((field) => ({
                      ...field,
                      items: [...field.items.map((item: any) => ({ ...item, values: [] }))],
                    }))
              );
            }}
          >
            Сбросить всё
          </Button>

          <MessageContainer>{errorMessage || text}</MessageContainer>
          <FlexContainer direction={"row"} justify={"end"}>
            {!isCreate && (
              <Button
                onClick={handleSubmit((data) => registerSubmit({ ...data, handled: true } as IRegisterFilterFields))}
                style={{ marginRight: "10px" }}
              >
                Сохранить как новый
              </Button>
            )}
            <Button type="submit">Сохранить</Button>
          </FlexContainer>
        </ButtonBlock>
      </ModalFooter>
    </CustomForm>
  );
};

const SettingItem = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.black};
  width: ${(props) => (props.width ? props.width : "100%")};
  margin-right: 10px;
`;

const FormsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

const CustomForm = styled.form`
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Button = styled(ButtonStyles)<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? theme.colors.lightGray : theme.colors.green)};
  color: ${({ disabled }) => (disabled ? theme.colors.black : theme.colors.white)};
  width: 189px;
  height: fit-content;

  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        opacity: 0.9;
      }
    `}
`;
const MessageContainer = styled.p`
  margin: 0;
  align-self: center;
`;
const MainSettingItem = styled(SettingItem)`
  width: initial;
  overflow-y: auto;
`;
