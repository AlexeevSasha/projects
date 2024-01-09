import { styled } from "common/styles/styled";
import { theme } from "common/styles/theme";
import React, { useCallback, useEffect, useState } from "react";
import { IconEdit } from "common/components/Icon/IconEdit";
import { IconSave } from "common/components/Icon/IconSave";
import { ru } from "common/lang/ru";
import { Input } from "common/ui/Input/Input";
import { IconContainerFloatingmes } from "common/components/Table/UIcomponent/UIcomponent";
import { IconDelete } from "../../../common/components/Icon/IconDelete";
import { IRouterDiagnosis } from "../../../common/interfaces/router/IRouterDiagnosis";

interface IProps {
  item: IRouterDiagnosis;
  index: number;
  name: string;
  defaultValue: string;
  clickSave: (index: number, value: string, item: IRouterDiagnosis, callback: () => void) => void;
  clickDelete: (index: number, item: IRouterDiagnosis) => void;
  placeholder?: string;
  maxLength?: number;
}

export const DiagnoseInput = (props: IProps) => {
  const [value, setValue] = useState(props.defaultValue || "");
  const [isDisabled, setIsDisabled] = useState<boolean>(!!props.defaultValue);

  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);

  const onClose = useCallback(() => {
    setValue(props.defaultValue);
  }, [props]);
  const inputHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    },
    [setValue]
  );
  const onClickEdit = async (defValue: string) => {
    if (!isDisabled) {
      onClose();
    }
    await setValue(defValue);
    setIsDisabled(!isDisabled);
  };

  return (
    <DiagnoseRow>
      <CustomInput
        value={value || ""}
        onChange={inputHandler}
        disable={isDisabled}
        disabled={isDisabled}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        fullWidth
      />
      <IconContainer>
        <IconContainerFloatingmes
          title={ru.floatingmes.edit}
          id={`edit_${props.name}`}
          onClick={() => onClickEdit(props.defaultValue)}
        >
          <IconEdit />
        </IconContainerFloatingmes>

        {!isDisabled && (
          <IconContainerFloatingmes
            title={ru.floatingmes.save}
            id={`save_${props.name}`}
            onClick={() => props.clickSave(props.index, value, props.item, () => setIsDisabled(true))}
          >
            <IconSave />
          </IconContainerFloatingmes>
        )}
        <IconContainerFloatingmes
          title={ru.floatingmes.delete}
          onClick={() => props.clickDelete(props.index, props.item)}
        >
          <IconDelete />
        </IconContainerFloatingmes>
      </IconContainer>
    </DiagnoseRow>
  );
};

const CustomInput = styled(Input)<{ disable?: boolean }>`
  background: ${(props) => (props.disable ? theme.colors.lightGray : theme.colors.white)};
`;

const DiagnoseRow = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${theme.colors.lightGray};
  input {
    width: 80%;
  }
`;
const IconContainer = styled.div`
  align-items: center;
  display: flex;
`;
