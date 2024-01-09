import { IOrder } from "common/interfaces/order/IOrder";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
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

export const InputDescription = React.memo(({ access, saveProposal, info, disabled, clickEdit }: IProps) => {
  const [value, setValue] = useState(info.description || "");

  useEffect(() => {
    setValue(info.description || "");
  }, [info]);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const onSave = () => {
    clickEdit("");
    saveProposal({ ...info, description: value.trim() });
  };

  return (
    <InputContainer>
      <Title>Описание регистра</Title>
      <EditContainer>
        <CustomInputProposalGeneralInfo
          id={"input_description"}
          placeholder={"Ввод"}
          width={350}
          value={value}
          onChange={onChange}
          disabled={disabled}
          disable={disabled}
          maxLength={300}
        />
        {access === Access.Edit ? (
          disabled ? (
            <IconContainerFloatingmes
              title={ru.floatingmes.edit}
              id={"edit_description"}
              onClick={() => clickEdit("description")}
            >
              <IconEdit />
            </IconContainerFloatingmes>
          ) : (
            <>
              <ContainerControlsGeneralInfo>
                <IconContainerFloatingmes title={ru.floatingmes.save} id={"save_description"} onClick={onSave}>
                  <IconSave />
                </IconContainerFloatingmes>

                <IconContainerFloatingmes
                  title={ru.floatingmes.cancel}
                  id={"close_edit_description"}
                  onClick={() => clickEdit("")}
                >
                  <IconCross hideFloatingmes />
                </IconContainerFloatingmes>
              </ContainerControlsGeneralInfo>
            </>
          )
        ) : null}
      </EditContainer>
    </InputContainer>
  );
});
