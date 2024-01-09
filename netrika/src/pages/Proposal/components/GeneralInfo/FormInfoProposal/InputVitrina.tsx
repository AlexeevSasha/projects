import { IOrder } from "common/interfaces/order/IOrder";
import { validateVitrine } from "common/constants/validate";
import { UserRolesEnum } from "common/interfaces/user/UserRolesEnum";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IconCross } from "common/components/Icon/IconCross";
import { IconEdit } from "common/components/Icon/IconEdit";
import { IconInfo } from "common/components/Icon/IconInfo";
import { IconSave } from "common/components/Icon/IconSave";
import { ru } from "common/lang/ru";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";
import { Access } from "../../../helpers/access";
import {
  CustomInputProposalGeneralInfo,
  EditContainer,
  InputContainer,
  Title,
  ContainerControlsGeneralInfo,
} from "./styledInputs";

interface IProps {
  access: Access;
  saveProposal: (value: IOrder) => void;
  info: IOrder;
  stateAuth: { login: string; userId: number | undefined };
  disabled: boolean;
  clickEdit: (value: string) => void;
}

export const InputVitrina = React.memo(({ access, saveProposal, info, stateAuth, disabled, clickEdit }: IProps) => {
  const [value, setValue] = useState(info.tableName || "");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setValue(info.tableName || "");
    if (disabled) {
      setIsError(false);
    }
  }, [info, disabled]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (validateVitrine.test(event.currentTarget.value.toLowerCase())) {
      setIsError(false);
    } else {
      setIsError(true);
    }
    setValue(event.currentTarget.value.toLowerCase());
  };

  const onSave = () => {
    clickEdit("");
    saveProposal({ ...info, tableName: value });
  };

  return (
    <InputContainer>
      <Title>
        Обозначение в базе данных
        <span
          className={`${
            value
              ? ""
              : stateAuth.login === UserRolesEnum.RegistrySuperUsr ||
                (stateAuth.login === UserRolesEnum.RegistryAdmin && access === Access.Edit)
              ? "required"
              : ""
          }`}
        >
          *
        </span>
      </Title>
      <EditContainer>
        <CustomInputProposalGeneralInfo
          id={"input_vitrina"}
          placeholder={"Ввод"}
          width={350}
          value={value}
          onChange={onChange}
          disabled={disabled}
          disable={disabled}
          maxLength={57}
          error={isError}
        />
        <>
          {stateAuth.login === UserRolesEnum.RegistrySuperUsr ||
          (stateAuth.login === UserRolesEnum.RegistryAdmin && access === Access.Edit) ? (
            disabled ? (
              <>
                <ContainerControlsGeneralInfo>
                  <IconContainerFloatingmes
                    title={ru.floatingmes.edit}
                    id={"edit_vitrina"}
                    onClick={() => clickEdit("vitrina")}
                  >
                    <IconEdit />
                  </IconContainerFloatingmes>
                </ContainerControlsGeneralInfo>

                <IconContainerFloatingmes title={ru.floatingmes.infoInputVitrine} id={"info_vitrina_input"}>
                  <IconInfo />
                </IconContainerFloatingmes>
              </>
            ) : (
              <>
                <ContainerControlsGeneralInfo>
                  {isError ? null : (
                    <IconContainerFloatingmes title={ru.floatingmes.save} id={"save_vitrina"} onClick={onSave}>
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
                </ContainerControlsGeneralInfo>
                <IconContainerFloatingmes title={ru.floatingmes.infoInputVitrine} id={"info_vitrina_input"}>
                  <IconInfo />
                </IconContainerFloatingmes>
              </>
            )
          ) : null}
        </>
      </EditContainer>
    </InputContainer>
  );
});
