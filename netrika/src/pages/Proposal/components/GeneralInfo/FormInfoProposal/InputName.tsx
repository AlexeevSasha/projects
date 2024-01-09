import { IOrder } from "common/interfaces/order/IOrder";
import { validateNameRegister } from "common/constants/validate";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IconCross } from "common/components/Icon/IconCross";
import { IconEdit } from "common/components/Icon/IconEdit";
import { IconSave } from "common/components/Icon/IconSave";
import { ru } from "common/lang/ru";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";
import { Access } from "../../../helpers/access";
import {
  ContainerControlsGeneralInfo,
  CustomInputProposalGeneralInfo,
  EditContainer,
  InputContainer,
  Title,
} from "./styledInputs";

interface IProps {
  access: Access;
  saveProposal: (value: IOrder) => void;
  info: IOrder;
  disabled: boolean;
  clickEdit: (value: string) => void;
  stateAuth: { login: string; userId: number | undefined };
}

export const InputName = React.memo(({ access, saveProposal, info, disabled, clickEdit }: IProps) => {
  const [value, setValue] = useState(info.name || "");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setValue(info.name || "");
    if (disabled) {
      setIsError(false);
    }
  }, [info, disabled]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (validateNameRegister(event.currentTarget.value.trim())) {
      setIsError(false);
    } else {
      setIsError(true);
    }
    setValue(event.currentTarget.value);
  };

  const onSave = () => {
    clickEdit("");
    saveProposal({ ...info, name: value.trim() });
  };

  return (
    <InputContainer>
      <Title>
        Наименование регистра
        <span className={`${value ? "" : "required"}`}>*</span>
      </Title>
      <EditContainer>
        <CustomInputProposalGeneralInfo
          id={"input_name"}
          placeholder={"Ввод"}
          width={350}
          value={value}
          onChange={onChange}
          disabled={disabled}
          disable={disabled}
          maxLength={80}
          error={isError}
        />
        {access === Access.Edit ? (
          disabled ? (
            <IconContainerFloatingmes title={ru.floatingmes.edit} id={"edit_name"} onClick={() => clickEdit("name")}>
              <IconEdit />
            </IconContainerFloatingmes>
          ) : (
            <>
              <ContainerControlsGeneralInfo>
                {isError ? null : (
                  <IconContainerFloatingmes title={ru.floatingmes.save} id={"save_name"} onClick={onSave}>
                    <IconSave />
                  </IconContainerFloatingmes>
                )}
                <IconContainerFloatingmes
                  title={ru.floatingmes.cancel}
                  id={"close_edit_name"}
                  onClick={() => clickEdit("")}
                >
                  <IconCross hideFloatingmes />
                </IconContainerFloatingmes>
              </ContainerControlsGeneralInfo>

              <IconContainerFloatingmes title={ru.floatingmes.infoInputName} id={"info_name_input"} />
            </>
          )
        ) : null}
      </EditContainer>
    </InputContainer>
  );
});
