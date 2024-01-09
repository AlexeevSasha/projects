import { ContainerControlsGeneralInfo } from "pages/Proposal/components/GeneralInfo/FormInfoProposal/styledInputs";
import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconCross } from "common/components/Icon/IconCross";
import { IconEdit } from "common/components/Icon/IconEdit";
import { IconSave } from "common/components/Icon/IconSave";
import { ru } from "common/lang/ru";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";
import { Access } from "../../../pages/Proposal/helpers/access";
import { InputStyle } from "./styles/inputStyles";

interface IProps {
  name: string;
  defaultValue: string;
  disabled?: boolean;
  clickEdit: (value: string) => void;
  clickSave: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  access?: Access;
}

export const InputWithActions = (props: IProps) => {
  const [value, setValue] = useState(props.defaultValue || "");

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  const onClose = useCallback(() => {
    setValue(props.defaultValue);
    props.clickEdit("");
  }, [props]);

  const actionInput = useMemo(() => {
    if (props?.access !== Access.Edit) return null;

    if (props.disabled) {
      return (
        <ContainerControlsGeneralInfo>
          <IconContainerFloatingmes
            title={ru.floatingmes.edit}
            id={`edit_${props.name}`}
            onClick={() => props.clickEdit(props.name)}
          >
            <IconEdit />
          </IconContainerFloatingmes>
        </ContainerControlsGeneralInfo>
      );
    }

    return (
      <ContainerControlsGeneralInfo>
        <IconContainerFloatingmes
          title={ru.floatingmes.save}
          id={`save_${props.name}`}
          onClick={() => props.clickSave(value)}
        >
          <IconSave />
        </IconContainerFloatingmes>
        <IconContainerFloatingmes title={ru.floatingmes.cancel} id={`close_edit_${props.name}`} onClick={onClose}>
          <IconCross hideFloatingmes />
        </IconContainerFloatingmes>
      </ContainerControlsGeneralInfo>
    );
  }, [props, onClose, value]);

  return (
    <EditContainer>
      <CustomInput
        value={value || ""}
        onChange={(event) => setValue(event.currentTarget.value)}
        disable={props.disabled}
        disabled={props.disabled}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
      />
      {actionInput}
    </EditContainer>
  );
};

const CustomInput = styled(InputStyle)<{ disable?: boolean }>`
  border-radius: 9px;
  margin-right: 20px;

  background: ${(props) => (props.disable ? theme.colors.lightGray : theme.colors.white)};

  width: 320px;
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
`;
