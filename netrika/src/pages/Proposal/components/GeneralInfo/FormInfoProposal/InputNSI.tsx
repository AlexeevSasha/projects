import { IOrder } from "common/interfaces/order/IOrder";
import { UserRolesEnum } from "common/interfaces/user/UserRolesEnum";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IconCross } from "common/components/Icon/IconCross";
import { IconEdit } from "common/components/Icon/IconEdit";
import { IconSave } from "common/components/Icon/IconSave";
import { ru } from "common/lang/ru";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";
import { Access } from "../../../helpers/access";
import { CustomInputProposalGeneralInfo, EditContainer, InputContainer, Title } from "./styledInputs";

interface IProps {
  access: Access;
  saveProposal: (value: IOrder) => void;
  info: IOrder;
  stateAuth: { login: string; userId: number | undefined };
  disabled: boolean;
  clickEdit: (value: string) => void;
}

export const InputNSI = React.memo(({ access, saveProposal, info, stateAuth, disabled, clickEdit }: IProps) => {
  const [value, setValue] = useState(info.nsi127Column || "");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setValue(info.nsi127Column || "");
    if (disabled) {
      setIsError(false);
    }
  }, [info, disabled]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setValue(event.currentTarget.value);
  };

  const onSave = () => {
    clickEdit("");
    saveProposal({ ...info, nsi127Column: value });
  };

  return (
    <InputContainer>
      <Title>НСИ</Title>
      <EditContainer>
        <CustomInputProposalGeneralInfo
          id={"input_nsi"}
          placeholder={"Ввод"}
          width={350}
          value={value}
          onChange={onChange}
          disabled={disabled}
          disable={disabled}
          maxLength={50}
          error={isError}
        />
        {stateAuth.login === UserRolesEnum.RegistrySuperUsr ||
        (stateAuth.login === UserRolesEnum.RegistryAdmin && access === Access.Edit) ? (
          disabled ? (
            <IconContainerFloatingmes
              title={ru.floatingmes.edit}
              id={"edit_vitrina_nsi"}
              onClick={() => clickEdit("NSI")}
            >
              <IconEdit />
            </IconContainerFloatingmes>
          ) : (
            <>
              {isError ? null : (
                <IconContainerFloatingmes title={ru.floatingmes.save} id={"save_vitrina_nsi"} onClick={onSave}>
                  <IconSave />
                </IconContainerFloatingmes>
              )}
              <IconContainerFloatingmes
                title={ru.floatingmes.cancel}
                id={"close_edit_vitrina"}
                onClick={() => clickEdit("")}
              >
                <IconCross hideFloatingmes />
              </IconContainerFloatingmes>
            </>
          )
        ) : null}
      </EditContainer>
    </InputContainer>
  );
});
